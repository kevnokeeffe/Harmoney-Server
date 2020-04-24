# Harmon€y 
### A Financial Accounts Management System
![](./README_Images/Harmoney.jpg =100x100)
 
### By Kevin O'Keeffe 
This is a Final Year Project.
BSc(Hons) in Software Systems Development,
Department of Computing and Mathematics, 
School of Science and Computing, WIT

[Demo Video Link]()

WebSite page: [Harmon€y](https://harmoney-client.web.app/#/).

Harmon€y is a proof of concept full stack application which elables users to 
control all their fancial accounts from a single application. Thus, giving 
users the ability to budget, manage and track their finances at ease.
The project is only made possible by the Payment Services  Directive (PSD2)
and Open Banking.

Harmon€y is built using the MEVN stack. MongoDB, Express.js, Vue,js and Node.js.

### System features include:
- User authentication and validation through the use of tokens.
- Two Factor Authentication through mobile SMS.
- Animated Background.
- Dashboard accounts overview (gathering data from mulitable financial institutions).
- Add financial institution accounts.
- Preform transactions.
- View statements.
- Remove financial institution accounts.
- Delete Harmon€y account.
- Client to Server to Server communication.
- Fully CRUD.
- Cypress testing.
- CI-CD.

## Client UI.

![Home](./README_Images/HomePage.png)
This is the Harmon€y home page. Your options are to Sign Up, login or view the About page. 

![Sign Up](./README_Images/SignUpPage.png)
This is the Harmon€y sign up page. Your standard sign up form with two factor authentication integrated. 

![Login](./README_Images/LoginPage.png)
This is the login page where the user can login with valid credentials. Mobile 2FA is in force.

![2FA Validation](./README_Images/LoginValidation.png)
This is the login validation code prompt. One must enter a valid code recived on the users registered mobile number to proceed.

![Dashboard](./README_Images/Dashboard.png)
This is the accounts overview dashboard. Where a user can interact with the accounts added to the Harmon€y service.

![Add Account](./README_Images/AddAccountPage.png)
This page is where you connect your financial institution accounts to the Harmon€y service.

![Account Details](./README_Images/AccountDetails.png)
The account details modal.
When an account is selected in the dashboard the user is presented with this modal.

![Account Statement](./README_Images/AccountStatement.png)
The account transactions statement modal.
A user can view this modal, by selecting the statement button in the accounts details modal. 

![Transaction Wizard](./README_Images/TransferWizzard.png)
The transfer wizard modal.
This modal is accessed when a user enters the account details modal and selects the transfer button.

![Internal Transfer](./README_Images/InternalTransfer.png)
The internal transfer modal.
This is where a user can transfer money between their accounts within the harmon€y system.

![External Transfer](./README_Images/ExternalTransfer.png)
The external transfer modal.
This is where a user can transfer money from one account ot any other account with a valid IBAN.

![Remove Account](./README_Images/RemoveAccountPage.png)
This is the remove account page where a user can remove financial institutions accounts from the system.

![Profile Page](./README_Images/ProfilePage.png)
This is where a user can view their personal details on the Harmon€y system. A user can delete their Hharmon€y account from this page by selecting the delete button and following the steps.

![About Page](./README_Images/AboutPage.png)
This is the about page it gives a brief description of the service that Harmon€y intends to provide.