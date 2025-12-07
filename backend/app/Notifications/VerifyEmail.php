<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class VerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Tạo link xác thực có chữ ký
        $verifyUrl = URL::temporarySignedRoute(
            'verificatin.verify',
            now()->addMinute(30), // link sống 30 phút
            [
                'id' => $notifiable->id,
                'hash' => sha1($notifiable->email),
            ]
        );
        return (new MailMessage)
            ->subject('Xác thực email của bạn!')
            ->greeting("Xin chào" . $notifiable->username)
            ->line('Bấm nút bên dưới để xác thực email!')
            ->action('Xác thực email', $verifyUrl)
            ->line('Nếu bạn không tạo tài khoản hãy bỏ qua email này!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
