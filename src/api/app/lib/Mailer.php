<?php
namespace lib;
error_reporting(-1);
class Mailer {
    static function Send($app, $to, $subject, $from, $tplPath, $data){
        $mail = new \PHPMailer;
        $mail->isSendmail();
        //$mail->SMTPDebug = 3;                               // Enable verbose debug output
        $mail->setFrom($from["email"], $from["name"]);
        $mail->CharSet = 'UTF-8';
        // TODO
        if (is_array($to)) {
            foreach ($to as $emailTo) {
                $mail->addAddress($emailTo);
            }
        }else{
            $mail->addAddress($to);
        }

        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = $subject;
        $app->view->appendData([
            'Title'         => $mail->Subject,
            'Parameters'    => $data
        ]);
        $mail->Body    = $app->view->fetch($tplPath);
        $mail->AltBody = $subject;
        return $mail->send();
    }
    static function SendToPrimary($app, $orderData){
        return self::Send(
            $app,
            "kurs.profit@yandex.ru",
            "Заказ звонка с сайта",
            [
                "email" => "info@kursprofit.ru",
                "name"  => "Kursprofit"
            ],
            "mail/mail.twig",
            $orderData
        );
    }
}
