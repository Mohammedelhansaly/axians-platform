<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Mail\createUserEmail;
use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admin', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Le champ email est requis.',
            'email.email' => 'Veuillez saisir une adresse email valide.',
            'password.required' => 'Le champ mot de pass est requis.',

        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->guard('admin')->attempt($credentials)) {
            return response()->json(['error' =>  'email / password Incorrect'], 401);
        }

        return $this->respondWithToken($token);
    }

    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);
    //     $credentials = $request->only('name', 'email', 'password');
    //     $credentials['password'] = bcrypt($credentials['password']);
    //     User::create($credentials);

    //     return response()->json('success');
    // }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::guard('admin')->user());
    }

    public function UpdateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.email' => 'Veuillez saisir une adresse email valide.',
        ]);

        $user = JWTAuth::parseToken()->authenticate();

        if ($request->imageUser) {
            if ($user->imageUser) {
                $exist = Storage::disk('public')->exists("img/$user->imageUser");
                if ($exist) {
                    Storage::disk('public')->delete("img/$user->imageUser");
                }
            }
            $imageName = Str::random() . '.' . $request->imageUser->getClientOriginalExtension();
            // Storage::disk('public')->putFileAs('img/user', $request->imageUser, $imageName);
            $request->imageUser->move(public_path('img'), $imageName);
            $user->imageUser = $imageName;
        }

        $user->name = $request->name;
        //$user->email = $request->email;
        $user->save();
        return response()->json([
            'message' => "l'utilisateur a été mis à jour avec succès"
        ], 200);        // return $imageName;
    }


    public function updatePassword(Request $request)
    {

        // // # Validation
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|different:old_password',
            'confirm_password' => 'required|same:new_password',
        ], [
            'old_password.required' => 'Le champ de l\'ancien mot de passe est requis.',
            'new_password.required' => 'Le champ du nouveau mot de passe est requis.',
            'new_password.different' => 'Le nouveau mot de passe doit être différent de l\'ancien mot de passe.',
            'confirm_password.required' => 'Le champ de confirmation du mot de passe est requis.',
            'confirm_password.same' => 'Le champ de confirmation du mot de passe doit correspondre au nouveau mot de passe.',
        ]);

        $user = JWTAuth::parseToken()->authenticate();

        #Match The Old Password

        if (!Hash::check($request->old_password, $user->password)) {

            return response()->json(['error' => "L'ancien mot de passe ne correspond pas !"], 401);
        }


        #Update the new Password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);


        return response()->json(['message' => "Le mot de passe a été changé avec succès!"]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::guard('admin')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.email' => 'Veuillez saisir une adresse email valide.',
        ]);

        $credentials = $request->only('name', 'email');
        $credentials['password'] = Str::random(10);

        User::create($credentials);
        Mail::to($credentials['email'])->send(new createUserEmail($credentials));
        return response()->json('success');
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('admin')->refresh());
    }
    public function getUsers()
    {
        return User::all();
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('admin')->factory()->getTTL() * 60,
            'admin' => Auth::guard('admin')->user()
        ]);
    }
}