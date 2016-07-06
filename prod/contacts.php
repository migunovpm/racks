<?
   include_once('smtp-func.php');
if (array_key_exists('contactFF', $_POST)) {
   $to = 'admin@racks-montazh.ru';
   $subject = 'Заполнена контактная форма с '.$_SERVER['HTTP_REFERER'];
   $message = "Имя: ".$_POST['nameFF']."\nТелефон: ".$_POST['contactFF']."\nIP: ".$_SERVER['REMOTE_ADDR'];
   $headers = 'Content-type: text/plain; charset="utf-8"';
   $headers .= "MIME-Version: 1.0\r\n";
   $headers .= "Date: ". date('D, d M Y h:i:s O') ."\r\n";
   smtpmail($to, $subject, $message, $headers);
   echo $_POST['nameFF'];
}
?>