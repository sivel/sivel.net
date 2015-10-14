---
author: sivel
categories:
- HowTo
- Linux
- Technology
date: '2007-10-26'
description: Using Sprint PCS Connection Card with Fedora
slug: fedora-pcs-connection-card
title: Using Sprint PCS Connection Card with Fedora
type: post
---

I have seen a good number of incoming links requesting this page that I had written back when I was using a wiki for my web site. So I decided to bring it back and make some redirects to direct people to the correct location.

With that being said these instructions are for configuring Fedora (Core 5 was used at the time) to use a Sprint PCS Connection Card to connect to the internet. I cannot verify or test this functionality as I no longer have a Sprint PCS Connection Card. So let the fun begin.

1. With the Sprint PCS Connection Card PC-5740 not inserted boot up the computer into Fedora Core 5.  
2. Open a terminal window and SU to root.  
3. Execute the following command:

> tail -f /var/log/messages

4. Insert the card.  
5. You should see something similar to the following:

> Aug 15 13:01:24 fedora-mobile kernel: pccard: CardBus card inserted into slot 0  
> Aug 15 13:01:24 fedora-mobile kernel: PCI: Enabling device 0000:03:00.0 (0000 -> 0002)  
> Aug 15 13:01:24 fedora-mobile kernel: ACPI: PCI Interrupt 0000:03:00.0[A] -> Link [LNKA] -> GSI 11 (level, low) -> IRQ 11  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.0: OHCI Host Controller  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.0: new USB bus registered, assigned bus number 5  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.0: irq 11, io mem 0xc2000000  
> Aug 15 13:01:24 fedora-mobile kernel: usb usb5: configuration #1 chosen from 1 choice  
> Aug 15 13:01:24 fedora-mobile kernel: hub 5-0:1.0: USB hub found  
> Aug 15 13:01:24 fedora-mobile kernel: hub 5-0:1.0: 1 port detected  
> Aug 15 13:01:24 fedora-mobile kernel: PCI: Enabling device 0000:03:00.1 (0000 -> 0002)  
> Aug 15 13:01:24 fedora-mobile kernel: ACPI: PCI Interrupt 0000:03:00.1[B] -> Link [LNKA] -> GSI 11 (level, low) -> IRQ 11  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.1: OHCI Host Controller  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.1: new USB bus registered, assigned bus number 6  
> Aug 15 13:01:24 fedora-mobile kernel: ohci_hcd 0000:03:00.1: irq 11, io mem 0xc2001000  
> Aug 15 13:01:24 fedora-mobile kernel: usb usb6: configuration #1 chosen from 1 choice  
> Aug 15 13:01:24 fedora-mobile kernel: hub 6-0:1.0: USB hub found  
> Aug 15 13:01:24 fedora-mobile kernel: hub 6-0:1.0: 1 port detected  
> Aug 15 13:01:25 fedora-mobile kernel: ohci_hcd 0000:03:00.0: wakeup  
> Aug 15 13:01:26 fedora-mobile kernel: usb 5-1: new full speed USB device using ohci_hcd and address 2  
> Aug 15 13:01:26 fedora-mobile kernel: usb 5-1: configuration #1 chosen from 1 choice  
> Aug 15 13:01:26 fedora-mobile kernel: cdc_acm 5-1:1.0: ttyACM0: USB ACM device  
> Aug 15 13:01:26 fedora-mobile kernel: usbcore: registered new driver cdc_acm  
> Aug 15 13:01:26 fedora-mobile kernel: drivers/usb/class/cdc-acm.c: v0.25:USB Abstract Control Model driver for USB modems and ISDN adapters

6. The above is all important but the line we are most interested in is the following:

> Aug 15 13:01:26 fedora-mobile kernel: cdc_acm 5-1:1.0: ttyACM0: USB ACM device

7. The above line shows us that the device created is ttyACM0 which is actually located at /dev/ttyACM0.  
8. Assuming you are running Gnome, download and install gnome-ppp with the following:

> yum install -y gnome-ppp

9. In order for gnome-ppp to work properly it must be run as root.  
10. Open a terminal window and su to root.  
11. Execute gnome-ppp (Tip: You can add a " &" to the end of gnome-ppp to disconnect it from the active session allowing you to close the terminal window without closing gnome-ppp).  
12. Click the "Setup" button.  
13. Click the "Detect" button. Your modem (/dev/ttyACM0) should automatically be detected. If not then something above went wrong.  
14. Click the "Init Strings..." button and change "Init 2" to "ATZ" (without the quotes).  
15. For the username you will need to boot into Windows, open the PCS connection application and select Diagnositcs from the menu. Your username will be in the form of username@sprintpcs.com.  
16. With gnome-ppp you are required to enter a password. This will not affect the dial up seeing as though the Sprint servers wont even respond to the password being sent. So type whatever you want in this field.  
18. The phone number is "#777".  
19. Click connect. You're done.  
20. If you can't access anything on the internet after connecting and you have IP address info, it is probably due to gnome-ppp not updating the nameserver statements in resolv.conf

Using gnome-ppp eventually got old for me so I wrote a bash script to take care of it. I won't post extensive usage information on how to use it so use at your own risk (although I don't see any actual risk involved).

You will need to do several things to get this up.

1. Download [sprint-dial.sh][1] to your home dir or where ever you want.

> wget http://cdn.sivel.net/s/p/sprint-dial.sh

2. Download or configure your own [.wvdial.conf][2] and place it in your home dir and /root

> wget http://cdn.sivel.net/w/v/.wvdial.conf

3. Execute the script

> sudo ./sprint-dial.sh

or

> su  
> ./sprint-dial.sh

 [1]: http://cdn.sivel.net/s/p/sprint-dial.sh
 [2]: http://cdn.sivel.net/w/v/.wvdial.conf
