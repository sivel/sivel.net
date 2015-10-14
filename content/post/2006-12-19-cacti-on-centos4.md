---
author: sivel
categories:
- HowTo
- Linux
date: '2006-12-19'
description: Cacti on CentOS4
slug: cacti-on-centos4
title: Cacti on CentOS4
type: post
---

This howto describes how to install and configure Cacti quickly on a CentOS server. Cacti packages are available from the RPMforge repository. Read this for information about the RPMForge repository. But beware, some repositories do not mix well. The rest of this HOWTO assumed that your system is set up to use the RPMforge repository. See http://wiki.centos.org/Repositories/RPMForge for instructions regarding RPMForge.

1. Install Cacti, Cactid and required Dependencies (yum install cacti cacti-cactid mysql-server net-snmp)

2. Modify /etc/httpd/conf.d/cacti.conf commenting out the following lines or modifying them to work with your configuration:

> order deny,allow  
> deny from all  
> allow from 127.0.0.1

3. Restart Apache (/etc/init.d/httpd restart)  
4. Make sure that httpd and mysqld are set to start on boot with the following commands:

> /sbin/chkconfig httpd on  
> /sbin/chkconfig mysqld on

5. If you want to monitor disk useage on the localhost make sure that snmpd is set to start at boot and that /etc/snmp/snmpd.conf is configured:

> /sbin/chkconfig snmpd on

By default the SNMP community string is public. Modify this if you wish.

6. Make sure the above services are currently started:

> /etc/init.d/httpd start  
> /etc/init.d/mysqld start  
> /etc/init.d/snmpd start

7. Create the cacti MySQL database:

> <p align="left">
>   mysqladmin create cacti
> </p>

8. Import the cacti database:

> mysql cacti < /var/www/cacti/cacti.sql

9. Create MySQL user for the cacti database and give it permission to the cacti database:

> shell> mysql  
> mysql> GRANT ALL ON cacti.* TO cactiuser@localhost IDENTIFIED BY 'somepassword';  
> mysql> flush privileges;  
> mysql> exit

10. Modify the database connection information in the following files:

> /var/www/cacti/include/config.php  
> /etc/cactid.conf

11. Run Cactid as root and then change permissions.

> shell> cactid  
> shell> chown -R cacti.cacti /var/net-snmp

12. Log in to Cacti by browsing to http://server/cacti. Username: admin, Password: admin. You will be prompted to change the password of the admin user.

13. Follow steps for a new install

14. Setup Cacti to use the cactid poller:

*   Console>Configuration>Settings>Paths
*   Modify "Cactid Poller File Path" to read /usr/bin/cactid
*   Click Save. Click the Poller tab.
*   Select cactid from the "Poller Type" drop down.
*   Select Ping and Snmp... from the "Downed Host Detection" drop down.
*   Click Save.

15. Add some devices and graphs:

*   Console>Create
*   Console>Create Graphs
*   Console>Management>Graph Management and add an existing host to a tree

16. Enjoy. The cron job located at /etc/cron.d/cacti will run poller.php every 5 minutes. It will get the poller configuration from the database and spawn cactid for polling. Graphs will show up after the first poll, they will populate with data after the second poll.
