---
layout: layouts/post.njk
title: Mail e2e Encryption
date: 2024-01-21
description: Web Key Directory rocks.
tags: ["front","tech"]
---  

Die Verschlüsselung von Mails war nie so einfach wie heute. Oder vielleicht besser ausgedrückt, komfortabel.
Bis heute erhalte ich nahezu 100% meiner Mails unverschlüsselt. Ich vermute das kommt daher, dass das Verschlüsseln von Mails für viele mit Zusatzaufwand verbunden ist.
Automatisierung schafft hier Abhilfe; einmal konfiguriert, erledigen Thunderbird und ein Web Key Directory den Task von Zauberhand.

Verschlüsselung vereinfachen, als Ziel des Bundesamt für Sicherheit in Deutschland-> [BSI Easy GPG]

## Thunderbird Setup
In Thunderbird ist die Konfiguration von OpenPGP problemlos über die Einstellungen möglich.
Ein Schlüsselpaar kann importiert oder gleich generiert werden.
Zusätzlich kann der öffentliche Schlüssel auch gleich auf den Keyserver "keys.openpgp.org" gestellt werden.
Alternativ kann man seinen Schlüssel in einem eigenen Web Key Directory publizieren.

Einmal publiziert, kann der Schlüssel von verschiedenen Mail-Clients automatisiert bezogen werden und schon ist das Verschlüsseln von Mails ein Kinderspiel, denn es passiert (je nach Konfiguration/Wunsch) von selbst.

[Thunderbird e2e Introduction]  
[Thunderbird OpenPGP HowTo and FAQ]  


## Mobile Setup mit K-9 Mail und OpenKeyChain
Sind die Nachrichten einmal verschlüsselt, kann man sie im Webmail nicht mehr lesen. 
Ein Mobile Setup empfiehlt sich, um unterwegs weiterhin Zugriff auf seine Nachrichten zu haben.
Thunderbird für Android ist noch in der Mache, aber bis dahin kann man auf den K-9 Client von Mozilla zurückgreifen. In Kombination mit der OpenKeyChainApp können die verschlüsselten Nachrichten nun auch auf dem Mobile unterwegs gelesen werden.

## GPG
Wenn man über OpenPGP spricht, kommt man nicht am GNU Privacy Guard vorbei:
[GNU Privacy Guard] (GPG)


Ein wichtiges Tool, dass für die gängigen Betriebssysteme entwickelt wurde und frei verfügbar ist.
Den einen oder anderen Anwendungsfall sehen wir beim Einrichten des Web Key Directory.

## Web Key Directory (WKD)
Das Verschlüsseln von Mails funktioniert so einfach, weil ein öffentlicher Schlüssel eines Kommunikationspartners "automatisiert" bezogen werden kann.

Aus den Thunderbird FAQ:
>You may try to discover keys online by email address, by clicking on an email address in an email message you are reading, and using the command "discover key" shown in the popup menu. Currently, it will search for published keys using the WKD protocol, and it will search for keys in the keys.openpgp.org keyserver.

Jeder der eine Domain besitzt, kann also kurzerhand sein Web Key Directory anlegen.
Grundsätzlich wird dabei nur der öffentliche Schlüssel in einem Verzeichnis auf dem Server abgelegt.
An einem Beispiel lässt sich das am einfachsten erklären:

Mein Schlüssel kann von einem Client über die folgende URI bezogen werden:
```
https://renatoheeb.com/.well-known/openpgpkey/hu/nmn1op6i4fdopb4x9jjon7snd7gkyt67
```

Die URI für die "Direct Method" setzt sich wie folgt zusammen:
```
Domain      -> https://renatoheeb.com/
Ordner      -> .well-known/openpgpkey/hu/
Key-File    -> nmn1op6i4fdopb4x9jjon7snd7gkyt67
```
Den Namen/Identifier des Schlüssels bekommt man mit gpg (--with-wkd-hash)
>Print a Web Key Directory identifier along with each user ID in key listings.


```console
gpg --import private.key

gpg --with-wkd-hash --fingerprint example@renatoheeb.com
pub   rsa4096 2024-01-19 [SC] [expires: 2029-01-17]
      5928 9D69 489E 3B36 9C9C  64F2 6F33 0321 3995 8F8C
uid           [ultimate] Renato Heeb <example@renatoheeb.com>
              nmn1op6i4fdopb4x9jjon7snd7gkyt67@renatoheeb.com
sub   rsa4096 2024-01-19 [E] [expires: 2029-01-17]

gpg --no-armor --export example@renatoheeb.com > nmn1op6i4fdopb4x9jjon7snd7gkyt67

```

Das File muss nun nur noch in das Verzeichnis gelegt und veröffentlicht werden.


## WKD-HASH (WKD)
<!-- <script src="https://gist.github.com/heebinho/1810066a83688e6cf21d2aa5cd3d16fc.js"></script> -->
Eine Variante an den WKD-Identifier zu kommen, ist wie bereits gesehen, GPG.
Aber was steckt dahinter? Aus der IETF Spezifikation von Robert Koch:

>  The so mapped local-part is hashed using the SHA-1 algorithm.  The
   resulting 160 bit digest is encoded using the Z-Base-32 method as
   described in [RFC6189], section 5.1.6.  The resulting string has a
   fixed length of 32 octets.

Folgend mein LinqPad Script in C#, als alternative Variante zum Generieren des Identifiers.
(ZBase32 Implementierung von [Fabrizio Tarizzo])

```csharp
void Main() {
    EncodeWkdHash("renato").Dump();
}

private string EncodeWkdHash(string localPart) {
    var bytes = Encoding.UTF8.GetBytes(localPart.ToLowerInvariant());
    var hash = System.Security.Cryptography.SHA1.HashData(bytes);
    return ZBase32.Encode(hash);
}


/*
 *   This file is part of OpenPgpWebKeyDirectory.NET
 *   
 *   Copyright (c) 2022 Fabrizio Tarizzo <fabrizio@fabriziotarizzo.org>
 *   
 *   Licensed under MIT License (see LICENSE)
 */
internal static class ZBase32 {
    private const byte SHIFT = 5;
    private const byte MASK = 0x1F;
    private const string ALPHABET = "ybndrfg8ejkmcpqxot1uwisza345h769";

    internal static string Encode(byte[] data) {
        if (data.Length == 0)
            return String.Empty;

        ushort buffer = data[0];
        int index = 1;
        short bitsLeft = 8;
        StringBuilder stringBuilder = new((data.Length / 5 * 8) + 1);

        while (bitsLeft > 0 || index < data.Length) {
            if (bitsLeft < SHIFT) {
                if (index < data.Length) {
                    buffer <<= 8;
                    buffer |= (ushort)(data[index++] & 0x00FF);
                    bitsLeft += 8;
                }
                else {
                    short pad = (short)(SHIFT - bitsLeft);
                    buffer <<= pad;
                    bitsLeft += pad;
                }
            }
            bitsLeft -= SHIFT;
            stringBuilder.Append(ALPHABET[MASK & (buffer >> bitsLeft)]);
        }

        return stringBuilder.ToString();
    }
}

```


## Hosting
Wenn man im Besitz einer eigenen Domain ist, aber keinen Server hat, kann man eine Website auf [GitHub Pages] betreiben.
GitHub Pages lässt sich gut mit einem Static Site Generator wie [11ty] kombinieren.  

Beim Generieren der Seite sollen die Schlüssel im Verzeichnis .well-known nun auch berücksichtig werden:
```js
eleventyConfig.addPassthroughCopy('.well-known');
```



## Test
Die folgende Seite bietet einen Test an, um zu prüfen, ob das Web Key Directory richtig aufgesetzt wurde:
[Mail Test]



## Fazit
Einmal eingerichtet, versendet man Mails verschlüsselt im Handumdrehen. 


Happy Mailing.



## Links & Referenzen  
[BSI Easy GPG]  
[Thunderbird e2e Introduction]  
[Thunderbird OpenPGP HowTo and FAQ]  
[GNU Privacy Guard]  
[GPG FAQ]  
[GitHub Pages]  
[11ty]  
[Mail Test]  
[IETF Specification]  
[OpenPgpWebKeyDirectory for .NET]  
[Fabrizio Tarizzo]  




[Thunderbird e2e Introduction]: https://support.mozilla.org/en-US/kb/introduction-to-e2e-encryption  
[Thunderbird OpenPGP HowTo and FAQ]: https://support.mozilla.org/en-US/kb/openpgp-thunderbird-howto-and-faq  
[BSI Easy GPG]: https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Freie-Software/E-Mail-Verschluesselung/EasyGPG/easygpg.html
[GNU Privacy Guard]:https://www.gnupg.org/index.html  
[GPG FAQ]: https://gnupg.org/faq/gnupg-faq.html  
[GitHub Pages]: https://pages.github.com/
[11ty]: https://www.11ty.dev/  
[Mail Test]: https://metacode.biz/openpgp/web-key-directory  
[IETF Specification]: https://datatracker.ietf.org/doc/draft-koch-openpgp-webkey-service/ 
[OpenPgpWebKeyDirectory for .NET]: https://github.com/roughconsensusandrunningcode/wkd-dotnet  
[Fabrizio Tarizzo]: https://www.fabriziotarizzo.org/ 







