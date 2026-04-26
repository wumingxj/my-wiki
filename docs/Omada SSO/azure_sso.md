# How to Configure Microsoft Azure Entra ID SSO on Omada Controller

Since version 5.15.16, Omada Controller supports Single Sign-On (SSO). This feature allows you to log in to the Omada Controller using an account from a third-party Identity Provider (IdP) such as Microsoft Azure Entra ID. SSO offers enhanced security and streamlined account management for your organization. For example, when an employee leaves the company, simply removing their account from the IdP will automatically revoke their access to the controller.

## Prerequisites
* Omada Controller 5.15.16 or above.

**Note**: Omada SSO currently supports only IdP-initiated SSO, meaning the SSO flow can only be started from the IdP endpoint. This typically requires you to have an app portal.

The following example uses Omada Cloud-Based Controller 5.15.20 and Microsoft Azure to demonstrate how to configure SSO on Omada.

## Microsoft Azure Configuration (Part 1)
### Create an Application
Log in to Microsoft Azure
![Azure Login](./azure_resource/azure-01-login.png)
and go to **Enterprise Applications**. Click **New application** → **Create your own application**, and give your application a name.
![Create App Step 1](./azure_resource/azure-02-create-app.png)
![Create App Step 2](./azure_resource/azure-03-app-name.png)

### Get the App Federation Metadata URL
Within the created application, choose **Set up single sign on** and select **SAML**.
![SAML Setup Step 1](./azure_resource/azure-04-saml-setup.png)
![SAML Setup Step 2](./azure_resource/azure-05-saml-page.png)
At this point, you don't yet have the information needed to set up SAML on this page.
![SAML Certificates](./azure_resource/azure-06-saml-certs.png)
Go to **SAML Certificates** and copy the **App Federation Metadata URL**.
![Copy Metadata URL](./azure_resource/azure-07-metadata-url.png)


## Omada Controller Configuration
### Create the SAML Connection
Log in to the Omada Controller and navigate to **MSP View** (or **Global View** if you are not using MSP mode) → **Settings** → **SAML SSO**.
![Omada SAML Settings](./azure_resource/omada-01-saml-settings.png)
Add a new SAML Connection, set **Configuration Mode** to **Metadata URL**, paste the URL you copied in the previous step, click **Load Info**, and then click **Send** to register.
![New SAML Connection](./azure_resource/omada-02-new-saml.png)
By clicking the menu icon, you can now find all the information needed for SAML configuration, including **Entity ID**, **Sign-On URL**, **Omada ID**, and **Resource ID**.
![SAML Entity Information](./azure_resource/omada-03-saml-info.png)

### Create the SAML Role
Click **Go to SAML Role** in the top-right corner to be redirected to the SAML role configuration page.
Here, we create a SAML role named **Omadasuperadmin** and select the MSP role and Customer role as needed.
![Create SAML Role](./azure_resource/omada-04-create-saml-role.png)

## Microsoft Azure Configuration (Part 2)
### Basic SAML Configuration
Return to **Microsoft Azure** → **Enterprise applications** → **Omada Controller** → **Manage** → **Single Sign-on** → **SAML**, and edit the **Basic SAML Configuration**.
You need to fill in **Identifier (Entity ID)**, **Reply URL (Assertion Consumer Service URL)**, and **Relay State (Optional)** as shown below.

Please note:
* The **Reply URL (Assertion Consumer Service URL)** corresponds to the **Sign-On URL** value from the Omada Controller. You don't need to configure **Sign on URL** in Microsoft Azure, as Omada Controller does not currently support SP-initiated SSO.
* **Relay State (Optional)** is the Base64-encoded value of **Resource ID_Omada ID**. You can generate this value using a Python script or an online tool such as https://www.base64encode.net.

![Basic SAML Configuration](./azure_resource/azure-08-basic-saml-config.png)

### SAML Attributes & Claims
Click **Edit** to create new claims.
![Edit Claims Step 1](./azure_resource/azure-09-edit-claims.png)
![Edit Claims Step 2](./azure_resource/azure-10-claims-interface.png)
We need to create two additional claims: **usergroup_name = user.assignedroles** and **username = user.displayname**, as shown below.
![New Claims Step 1](./azure_resource/azure-11-new-claims-1.png)
![New Claims Step 2](./azure_resource/azure-12-new-claims-2.png)

### Register the Application
Go to **App Registrations** → **All Applications**, and you will find the app you just created.
![App Registrations](./azure_resource/azure-13-app-registrations.png)
Click into the app, and under **Manage** → **App roles**, click **Create app role**.
![App Roles](./azure_resource/azure-14-app-roles.png)
Configure the app role as shown below. You can set the **Display name** and **Description** as needed, but make sure the **Value** matches the SAML Role configured on the Omada Controller.
![Configure Role](./azure_resource/azure-15-configure-role.png)

### Add Users to the App
Return to **Enterprise applications** → **Omada Controller**, and under **Manage** → **Users and Groups**, click **Add user/group** to add a new user.
![Add Users to App](./azure_resource/azure-16-add-users.png)
Select a user from Microsoft Azure AD, choose the role you just created, and assign it.
![Select User and Assign Role](./azure_resource/azure-17-select-user.png)

## Test the SSO
Now that you have set up Omada SSO with Microsoft Azure and added a user with Omada superadmin authorization, you can test it.

### Test SSO from Microsoft Azure
Go back to **Enterprise applications** → **Omada Controller** → **Manage** → **Single Sign-on**, then go to **Test** → **Test Sign in**.
![Test Sign-in](./azure_resource/azure-18-test-signin.png)
You will be redirected to the authentication page. Choose an account and log in.
![Authentication Page](./azure_resource/azure-19-auth-page.png)
After successfully logging in to the Controller, you can see the SAML users on the controller.
![SAML Users on Controller](./azure_resource/omada-05-saml-users.png)

### Test SSO from the App Portal
Since Omada Controller currently only supports IdP-initiated SSO, you need an app portal as an entry point. For example, you can use https://myapplications.microsoft.com. After logging in with your account, you will find the app. Click it to log in.
![MyApps Portal](./azure_resource/azure-20-myapps-portal.png)

## Frequently Asked Questions
* **What if I get the error "browser is not compatible"?**
![Browser Compatibility Error](./azure_resource/omada-06-browser-error.png)
**A**: Check whether you are using the correct Reply/Sign-On URL. In this example, https://euw1-omada-**cloud**.tplinkcloud.com/sso/saml/login was used by mistake instead of the correct https://euw1-omada-**account**.tplinkcloud.com/sso/saml/login.
![Correct Sign-On URL](./azure_resource/omada-07-correct-url.png)


