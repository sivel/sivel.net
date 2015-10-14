---
author: sivel
categories:
- HowTo
- Linux
date: '2006-12-06'
description: Linux Dual Network Route Hack (Multi-Homing)
slug: linux-multi-homing
title: Linux Dual Network Route Hack (Multi-Homing)
type: post
---

**The situation:** A single box has multiple NICs in it, each connected to a different subnet (and therefore with distinct IP addresses). For specificity in the following, let us assume it has two NICs, one NICA having an IP address IPaddrA on the subnetA subnet. The other, NICB, has IP address IPaddrB on the subnetB subnet.

**The symptoms:** All machines on subnetA can see the box using IPaddrA. Similarly, boxes on subnetB can see the box using IPaddrB. I believe you should also be able to see either address ( IPaddrA or IPaddrB ) if on the other subnet ( subnetB or subnetA, respectively), but won't guarrantee it. The problem is that outside hosts, not on either local subnet (neither subnetA nor subnetB ) can only see the machine using one of the two addresses, and get no response from the other one.

**My analysis:** Let us assume that it is IPaddrA which is visible from the outside world, and IPaddrB that is blocked. What appears to be happening is that both NICs function properly with respect to traffic on their own subnet. IPaddrA functions properly even for stuff not on subnetA; when a machine on some other net tries to contact, the subnetA gateway sends the packets to NICA, and the response goes out on NICA back to the gateway, with a source address of IPaddrA and the foreign machines IP address.

When a machine not on subnetB tries to talk to IPaddrB, things start the same. The subnetB gateway sends the packets to NICB, the linux box decides how to respond, and a response is sent out. However, the response goes out on NICA but with the IPaddrB source address. If the machine trying to be reached is on subnetA, the packets seem to get to the destination and no one complains. But if the packets are for another subnet, the router drops the packets because the source address is illegal for subnetA (as it is IPaddrB which is a subnetB address).

**Hack to fix it:** In the rc.local file, use the /sbin/ip command to set up a somewhat more complicated routing scenario with a separate routing table for each subnet. For each subnet, the routing table simply goes out through the NIC if local, or through the NIC to the appropriate gateway if non-local. Then hook these tables into the routing rule based on the source IP address.

For example, if the two subnets are 172.70.12.0/23 and 172.80.24/23 on and , respectively, with 172.70.12.1 and 172.80.24.1 as the gateways you can do something like

    #!/bin/bash
    
    #Set up the first subnet's routing table (we'll name it 70)  
    /sbin/ip route flush table 70  
    /sbin/ip route add table 70 to 172.70.12.0/23 dev eth0  
    /sbin/ip route add table 70 to default via 172.70.12.1 dev eth0
    
    #Set up the second subnet's routing table (we'll call it 80)  
    /sbin/ip route flush table 80  
    /sbin/ip route add table 80 to 172.80.24.0/23 dev eth1  
    /sbin/ip route add table 80 to default via 172.80.24.1 dev eth1
    
    #Create the rules to choose what table to use. Choose based on source IP  
    #We need to give the rules different priorities; for convenience name priority  
    #after the table  
    /sbin/ip rule add from 172.70.12.0/23 table 70 priority 70  
    /sbin/ip rule add from 172.80.24.0/23 table 80 priority 80
    
    #Flush the cache to make effective  
    /sbin/ip route flush cache

Physics typically puts this into a file called rc.linux-dual-net-route-hack in the sysconfig tree and calls this script from /etc/rc.local. This seems to work fine, as the primary interface works properly even without the hack, and that is the interface used to communicate with AFS, KDC, etc. servers, so machine seems to boot OK. The extra bit of network connectivity gained by the other NIC can wait until the rc.machine script gets run.

**NOTE:** The above is taken completely from http://www.physics.umd.edu/rgroups/pnce/pcs-docs/Glue/linux-route-hack.html#dual-subnets with small fixes for typos and for use on CentOS 4.x and RHEL 4.x.

I would like to further mention that while this resolves the problem of needing two default gateways, one for each NIC, for devices accessing these IP addresses from the outside it does not mention accessing the internet from the linux box that the above commands were issued on.

I would recommend choosing which NIC/Network you wish to use as your default internet connection. Then by using the NIC init script in /etc/sysconfig/network-scripts you would configure the default gateway with the GATEWAY statment in the respective ifcfg- script. If the GATEWAY statement is configured in all or some of the ifcfg scripts, the last one activated will be the default gateway that is used.
