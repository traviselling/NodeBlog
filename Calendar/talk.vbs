
text=inputbox("enter text to be spoken")
Set sapi=Createobject("sapi.spvoice")
sapi.Speak text
