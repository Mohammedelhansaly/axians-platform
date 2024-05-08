<div style="font-family: Arial, sans-serif; color: #333; padding:20px;">

    <h1 style=" color: #056EE9; font-size: 24px;">Bienvenue!</h1>

    <p style="font-size: 16px;">Cher utilisateur,</p>

    <p style="font-size: 16px;">Nous avons le plaisir de vous informer que votre compte a été créé avec succès avec les
        détails suivants :</p>

    <ul style="list-style-type: none; padding-left: 0; font-size: 16px;">
        <li><strong>Nom :</strong> {{ $credentials['name'] }}</li>
        <li><strong>Email :</strong> {{ $credentials['email'] }}</li>
        <li><strong>Mot de passe :</strong> {{ $credentials['password'] }}</li>
    </ul>

    <p style="font-size: 16px;">Si vous avez des questions ou avez besoin d'assistance supplémentaire, n'hésitez pas à
        nous contacter. Merci d'avoir choisi {{ config('app.name') }} !</p>

    <p style="font-size: 16px;">Cordialement,<br>
        L'équipe de {{ config('app.name') }}</p>

</div>