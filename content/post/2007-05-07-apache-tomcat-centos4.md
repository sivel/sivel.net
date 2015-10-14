---
author: sivel
categories:
- HowTo
- Linux
date: '2007-05-07'
description: Installing Apache and Tomcat on CentOS4
slug: apache-tomcat-centos4
title: Installing Apache and Tomcat on CentOS4
type: post
---

This HowTo will discuss how to install Apache and Tomcat on CentOS4. And if the title isn't self explanatory enough we will be using mod_jk to link Apache and Tomcat.

1. Let's install Apache to start...

> shell> yum install httpd

2. Now let's download the Java JDK from http://java.sun.com/javase/downloads/index.jsp (It is labeld as JDK 6u1)

*   After clicking on Download we are going to look for "Linux Platform - Java(TM) SE Development Kit 6 Update 1"
*   Download the "Linux RPM in self-extracting file" the filename should be jdk-6u1-linux-i586-rpm.bin

> shell> mkdir -p /usr/java/  
> shell> mv jdk-6u1-linux-i586-rpm.bin /usr/java  
> shell> chmod a+x /usr/java/jdk-6u1-linux-i586-rpm.bin  
> shell> /usr/java/jdk-6u1-linux-i586-rpm.bin  
> shell> ln -s /usr/java/jdk1.6.0_01 /usr/java/jdk

3. Next let's download the following packages from http://archive.apache.org/dist/tomcat/tomcat-5/archive/v5.5.9/bin/ (Tomcat 5.5.9 used for this set of instructions)

*   jakarta-tomcat-5.5.9-admin.tar.gz
*   jakarta-tomcat-5.5.9.tar.gz

> shell> tar xzvf jakarta-tomcat-5.5.9-admin.tar.gz  
> shell> tar xzvf jakarta-tomcat-5.5.9.tar.gz  
> shell> mv jakarta-tomcat-5.5.9 /usr/java/tomcat

4. We can now setup an init script for Tomcat

*   Download [catalina][1] to /etc/init.d

> shell> chmod a+x catalina  
> shell> chkconfig -add catalina  
> shell> chkconfig catalina on

5. Now we need to install the Tomcat Apache connector

*   Download mod\_jk from http://mirrors.dotsrc.org/jpackage/1.6/redhat-el-4.0/free/RPMS/mod\_jk-ap20-1.2.15-1jpp.i386.rpm

> shell> rpm -Uvh mod_jk-ap20-1.2.15-1jpp.i386.rpm

6. Edit the workers.properties file in /usr/java/tomcat/conf

> workers.tomcat_home=/usr/java/tomcat  
> workers.java_home=/usr/java/jdk  
> workers.list=ajp13  
> worker.ajp13.host=[fully qualified domain name]  
> worker.ajp13.cachesize=20  
> worker.loadbalancer.balanced_workers=ajp13

7. Edit the server.xml file in /usr/java/tomcat/conf

*   Immediately below the entry <Server port="8005" shutdown="SHUTDOWN"> add:

> <Listener className="org.apache.jk.config.ApacheConfig"  
> modJk="/usr/lib/httpd/modules/mod_jk.so"  
> workersConfig="/usr/java/tomcat/conf/workers.properties"  
> jkLog="/usr/java/tomcat/logs/mod_jk.log" jkDebug="info" />

*   Find the entry <Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false"> and change localhost to your fully qualified domain name or IP address.
*   This is also how you would define Tomcat virtual hosts. I won't go into detail about virtual hosting with Tomcat. If you are interested in virtual hosting with Tomcat I suggest checking out some search results on [Google][2].

> <Host name="[fully qualified domain name]" appBase="webapps"  
> unpackWARs="true" autoDeploy="true"  
> xmlValidation="false" xmlNamespaceAware="false">

*   Immidiately following that line add:

> <Listener className="org.apache.jk.config.ApacheConfig" append="true" jkWorker="ajp13" />

8. Let's now start up Tomcat. From the configuration changes made above Tomcat will generate an Apache conf file that will be used to load the Tomcat info.

> shell> /etc/init.d/catalina start

9. Now we need to do a few quick things for Apache to work with Tomcat.

> shell> ln -s /usr/java/tomcat/conf/auto/mod_jk.conf /etc/httpd/conf.d/  
> shell> /etc/init.d/httpd start

10. Let's give it a test

*   Open a web browser and navigate to http://[hostname]/jsp-examples

Side Notes: As you notice above, Tomcat is installed in /usr. /usr is usually not one of the larger partitions on a web server. In the past I have created a directory /var/www/tomcat, copied the contents of /usr/java/tomcat/webapps to /var/www/tomcat, delete webapps and then create a symlink from /var/www/tomcat to /usr/java/tomcat/webapps. I also recommend creating a directory /var/log/tomcat, deleting /usr/java/tomcat/logs and creating a symlink from /var/log/tomcat to /usr/java/tomcat/logs. Use your best judgment as to how you want to handle this.

 [1]: http://cdn.sivel.net/c/a/catalina
 [2]: http://www.google.com/search?hl=en&q=tomcat+virtual+hosts
