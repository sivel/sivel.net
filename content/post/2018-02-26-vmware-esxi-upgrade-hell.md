---
date: 2018-02-26T17:00:00-06:00
title: "VMware ESXi Upgrade Hell"
categories:
- VMware
type: post
author: sivel
slug: vmware-esxi-upgrade-hell
description: "VMware ESXi Upgrade Hell"
---
This past weekend, I had a little free time before my family woke up, and I decided I'd bring my free standalone ESXi server up to patch level. How mistaken was I, that this would be accomplished within the 30 minutes I had available. The next 5 hours would be telling...

I logged into the VMware website and downloaded all of the product patches released since install, and proceeded to install them via `esxcli software vib install -v`.

After rebooting, I checked the "PublicSwtich0" vswitch to see if it's uplink was missing, which seems to happen on every reboot, due to initilization order I imagine (this is on unsupported hardware with 3rd party drivers). It was of course missing, and easily remediated with `esxcli network vswitch standard uplink add --uplink-name=vmnic32 --vswitch-name=PublicSwitch0`.  A side note, for whatever reason, is that I cannot add the uplink back via the GUI, it must be done via the CLI.

After adding the uplink back to the vswitch, I still couldn't access the VM via the interface linked with `PublicSwitch0`. I tried all sorts of random things, as I'm not an ESXi pro, and after fumbling around for at least an hour, nothing had worked. I had resigned myself to the fact that it was broken, and deployed some critical services to a public cloud for temporary hosting (yay for finally creating Ansible playbooks for my personal stuff). I decided, without any good option, that I was going to re-install ESXi. To do this originally I had to create a custom ISO with the NIC drivers I needed inside of a Windows VM, since I have no Windows machines, and then follow some complex instructions to create a bootable flash drive. I immediately went to go grab the flash drive I used to find it missing. 30 minutes of searching and I never found it.

I decided that I should go buy hardware that was supported, and after about 30 minutes of searching and realizing I wasn't about to spend thousands on hardware with dual NICs that could hold at least 4 drives, I curled into a ball and cried...Well, not really.

I went back to it, and after thinking things through I decided to see if I could find a way to downgrade the updated packages. Of course this wasn't as easy as I wanted. I investigated recovery mode, which was of no help. I found the `--allow-downgrades` flag for `esxcli software profile update`. Things finally started to make sense, and I found the version I had been running originally and executed:

```
esxcli software profile update -p ESXi-6.5.0-20170701001s-standard -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml
```

And was immediately met with an error of:

```
[InstallationError]
[Errno 28] No space left on device
       vibs = VMware_locker_tools-light_6.5.0-0.23.5969300
```

A bit of Google searching and experimentation and I was able to do the following:

```
cd /tmp
wget http://hostupdate.vmware.com/software/VUM/PRODUCTION/main/esx/vmw/vib20/tools-light/VMware_locker_tools-light_6.5.0-0.23.5969300.vib
esxcli software vib install -f -v /tmp/VMware_locker_tools-light_6.5.0-0.23.5969300.vib
esxcli software profile update -p ESXi-6.5.0-20170701001s-standard -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml
```

I excitedly rebooted, to find that the NIC still didn't seem to be working. I did some uninstall/install dances with the drivers, rebooted like 8 times, still nothing. I'd really screwed myself.

Finally I decided to delete `PublicSwitch0` by first changing the Network for the VMs using that vswitch, to utilize `vSwitch0`, then deleting `PublicSwitch0`. Afterwhich, I recreated `PublicSwitch0`, created a `Public Network` port group, reassigned the Network for the affected VMs, powered them on, and...it worked!

I decided to update again, and used `esxcli software profile update` to get to `ESXi-6.5.0-20171204001-standard` and again after rebooting, nothing worked, but at least killing the `PublicSwitch0` and recreating it resolved the problem.

I'm working on creating a script to delete `PublicSwitch0` and recreate it. I'll then have an easily repeatable fix I can use each time I upgrade.

Anyway, maybe this helps someone out there.
