<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EquipementNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $expiredEquipmentsCount;
    protected $project;
    protected $equipement;

    public function __construct($project, $expiredEquipmentsCount, $equipement)
    {
        $this->project = $project;
        $this->expiredEquipmentsCount = $expiredEquipmentsCount;
        $this->equipement = $equipement;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'equipement_id' => $this->equipement->id,
            'message' => "Il y a {$this->expiredEquipmentsCount} équipements expirés dans le projet."
        ];
    }
}