---
layout: post.njk
title: Thunderbird Source View
date: 2024-02-11
description: Decode quoted-printable
tags: ["front", "rss", "tech", "note"]
---  

## Intro
Vor nicht allzu langer Zeit bin ich zurück zu Thunderbird gewechselt. Eine Funktion die ich gelegentlich brauche,
ist das Anzeigen der Source des Mails. (Ctrl+U).  
Was Thunderbird hier leider noch nicht zur Verfügung stellt, ist ein Decoder. Beispielsweise wenn ein Mail in 
quoted-printable übermittelt wurde:

```
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: quoted-printable
```

## Decode quoted-printable
Das "Decodieren" ist mit den richtigen Instrumenten schnell und einfach.  
Dazu kommt [MimeKit] von Jeffrey Stedfast zum Einsatz:

```
void Main() {
    string file = @"C:\mail.source";
    DecodeQuotedPrintable(File.ReadAllText(file), "UTF-8").Dump();
}

static string DecodeQuotedPrintable(string input, string charset) {
    var decoder = new QuotedPrintableDecoder();
    var buffer = Encoding.ASCII.GetBytes(input);
    int len = decoder.EstimateOutputLength(buffer.Length);
    var output = new byte[len];
    int used = decoder.Decode(buffer, 0, buffer.Length, output);
    var encoding = Encoding.GetEncoding(charset);
    return encoding.GetString(output, 0, used);
}
```

Alternativ kann ein Online Decoder eingesetzt werden, falls die Mail keine Schützenswerten Daten enthält. 🚦

## Links & Referenzen  
[RFC 2045 Internet Message Bodies]  
[MimeKit]  
[Webatic Decoder]  
[DenCode Decoder]  




[RFC 2045 Internet Message Bodies]: https://www.rfc-editor.org/rfc/rfc2045#section-6.7  
[MimeKit]: https://github.com/jstedfast/MimeKit  
[Webatic Decoder]: https://www.webatic.com/quoted-printable-convertor  
[DenCode Decoder]: https://dencode.com/string/quoted-printable   







