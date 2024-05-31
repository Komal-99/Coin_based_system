import streamlit as st
import requests

# GraphQL API endpoint
API_URL = 'http://localhost:4000/graphql'

def graphql_query(query, variables=None, token=None):
    headers = {'Authorization': f'Bearer {token}'} if token else {}
    response = requests.post(API_URL, json={'query': query, 'variables': variables}, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Query failed to run with status code {response.status_code}")

def sign_up(username, email, password):
    query = '''
    mutation ($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            username
        }
    }
    '''
    variables = {'username': username, 'email': email, 'password': password}
    result = graphql_query(query, variables)
    return result['data']['createUser']

def sign_in(username, password):
    query = '''
    mutation ($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            token
        }
    }
    '''
    variables = {'username': username, 'password': password}
    result = graphql_query(query, variables)
    return result['data']['signIn']['token']

def delete_user(user_id, token):
    query = '''
    mutation ($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
    '''
    variables = {'id': user_id}
    result = graphql_query(query, variables, token)
    return result['data']['deleteUser']

def update_user(user_id, email, username, token):
    query = '''
    mutation ($id: ID!, $email: String!, $username: String!) {
        updateUser(id: $id, email: $email, username: $username) {
            id
        }
    }
    '''
    variables = {'id': user_id, 'email': email, 'username': username}
    result = graphql_query(query, variables, token)
    return result['data']['updateUser']

def create_payment(user_id, amount, payment_method, stripe_charge_id, token):
    query = '''
    mutation ($userId: ID!, $amount: Float!, $payment_method: String!, $Stripe_charge_id: String!) {
        createPayment(userId: $userId, amount: $amount, payment_method: $payment_method, Stripe_charge_id: $Stripe_charge_id) {
            payment_status
            transactionId
        }
    }
    '''
    variables = {'userId': user_id, 'amount': amount, 'payment_method': payment_method, 'Stripe_charge_id': stripe_charge_id}
    result = graphql_query(query, variables, token)
    return result['data']['createPayment']

def fetch_wallet_details(user_id, token):
    query = '''
    query ($userId: ID!) {
        wallet(userId: $userId) {
            id
            balance
            last_updated_date
        }
    }
    '''
    variables = {'userId': user_id}
    result = graphql_query(query, variables, token)
    return result['data']['wallet']

def consume_service(service_id, no_of_question, type_of_question, size_of_document, ques_regenerate, token):
    query = '''
    mutation ($id: ID!, $no_of_question: Int!, $type_of_question: String!, $size_of_document: Int!, $ques_regenerate: Boolean!) {
        consumeService(id: $id, no_of_question: $no_of_question, type_of_question: $type_of_question, size_of_document: $size_of_document, ques_regenerate: $ques_regenerate) {
            balance
            last_updated_date
        }
    }
    '''
    variables = {
        'id': service_id,
        'no_of_question': no_of_question,
        'type_of_question': type_of_question,
        'size_of_document': size_of_document,
        'ques_regenerate': ques_regenerate
    }
    result = graphql_query(query, variables, token)
    return result['data']['consumeService']

def fetch_transactions(user_id, token):
    query = '''
    query ($userId: ID!) {
        transactions(userId: $userId) {
            Payment {
                Stripe_charge_id
            }
            transaction_date
            id
            amount
        }
    }
    '''
    variables = {'userId': user_id}
    result = graphql_query(query, variables, token)
    return result['data']['transactions']

def main():
    st.title("Edu Platform")

    menu = ["Home", "Login", "SignUp"]
    choice = st.sidebar.selectbox("Menu", menu)

    if choice == "Home":
        st.subheader("Home")

    elif choice == "SignUp":
        st.subheader("Create a New Account")
        username = st.text_input("Username")
        email = st.text_input("Email")
        password = st.text_input("Password", type='password')
        if st.button("SignUp"):
            result = sign_up(username, email, password)
            st.success(f"Account created for {result['username']}")

    elif choice == "Login":
        st.subheader("Login to Your Account")
        username = st.text_input("Username")
        password = st.text_input("Password", type='password')
        if st.button("Login"):
            token = sign_in(username, password)
            if token:
                st.session_state['token'] = token
                st.session_state['username'] = username
                st.success("Logged In as {}".format(username))
                dashboard()
            else:
                st.warning("Incorrect Username/Password")

def dashboard():
    st.sidebar.subheader("Dashboard")
    options = ["Recharge Wallet", "View Transactions", "Create Course", "Profile", "Delete Account", "Create Payment", "Wallet Details"]
    choice = st.sidebar.selectbox("Dashboard Menu", options)

    token = st.session_state.get('token')
    username = st.session_state.get('username')

    if choice == "Recharge Wallet":
        st.subheader("Recharge Wallet")
        amount = st.number_input("Enter Amount", min_value=0.0, step=0.01)
        if st.button("Recharge"):
            result = recharge_wallet(token, amount)
            st.success(f"Wallet recharged successfully! New Balance: {result['balance']}")

    elif choice == "View Transactions":
        st.subheader("View Transactions")
        transactions = fetch_transactions(username, token)
        st.write(transactions)

    elif choice == "Create Course":
        st.subheader("Create Course")
        no_of_question = st.number_input("Number of Questions", min_value=1)
        type_of_question = st.selectbox("Type of Question", ["MCQ", "Short Answer", "Essay"])
        size_of_document = st.number_input("Size of Document", min_value=1)
        ques_regenerate = st.checkbox("Question Regenerate")
        if st.button("Create Course"):
            result = consume_service(username, no_of_question, type_of_question, size_of_document, ques_regenerate, token)
            st.success(f"Course created successfully! New Balance: {result['balance']}")

    elif choice == "Profile":
        st.subheader("Update Profile")
        user_id = st.text_input("User ID")
        new_email = st.text_input("New Email")
        new_username = st.text_input("New Username")
        if st.button("Update Profile"):
            result = update_user(user_id, new_email, new_username, token)
            st.success(f"Profile updated for User ID: {result['id']}")

    elif choice == "Delete Account":
        st.subheader("Delete Account")
        user_id = st.text_input("User ID")
        if st.button("Delete Account"):
            result = delete_user(user_id, token)
            st.success(f"Account deleted for User ID: {result['id']}")

    elif choice == "Create Payment":
        st.subheader("Create Payment")
        user_id = st.text_input("User ID")
        amount = st.number_input("Amount", min_value=0.0, step=0.01)
        payment_method = st.text_input("Payment Method")
        stripe_charge_id = st.text_input("Stripe Charge ID")
        if st.button("Create Payment"):
            result = create_payment(user_id, amount, payment_method, stripe_charge_id, token)
            st.success(f"Payment created with Transaction ID: {result['transactionId']}")

    elif choice == "Wallet Details":
        st.subheader("Wallet Details")
        user_id = st.text_input("User ID")
        if st.button("Fetch Wallet Details"):
            result = fetch_wallet_details(user_id, token)
            st.write(result)

if __name__ == '__main__':
    main()
