import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient(
    'mongodb+srv://kvanaiyan2000:TheHexClan@cluster0.dtlyu7o.mongodb.net/Thrifting?retryWrites=true&w=majority&appName=Cluster0')
db = client['Thrifting']  # Replace with your database name
collection = db['products']  # Replace with your collection name

# Fetch products data from MongoDB
products_data = list(collection.find(
    {}, {'_id': 1, 'name': 1, 'description': 1, 'category': 1, 'price': 1}))

# Convert dataset to DataFrame
products_df = pd.DataFrame(products_data)

# Verify the columns
print(products_df.columns)

# Ensure the 'description' and 'category' columns exist
if 'description' in products_df.columns and 'category' in products_df.columns:
    # Convert description to string and handle NaN values
    products_df['description'] = products_df['description'].astype(
        str).fillna('')
    # Convert category array to a single string
    products_df['category'] = products_df['category'].apply(
        lambda x: ' '.join(x))
    # Create a new column 'text' by concatenating 'description' and 'category'
    products_df['text'] = products_df['description'] + \
        ' ' + products_df['category']
else:
    raise KeyError(
        "Columns 'description' and/or 'category' not found in products_df")

# Normalize the price feature
scaler = MinMaxScaler()
products_df['price_normalized'] = scaler.fit_transform(products_df[['price']])

# Create TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the product descriptions along with categories
tfidf_matrix = tfidf_vectorizer.fit_transform(products_df['text'])

# Concatenate TF-IDF matrix with normalized price feature
combined_matrix = pd.concat(
    [pd.DataFrame(tfidf_matrix.toarray()), products_df[['price_normalized']]], axis=1)

# Calculate cosine similarity matrix
cosine_sim_matrix = cosine_similarity(combined_matrix, combined_matrix)


@app.route('/recommend', methods=['POST'])
def get_recommendations():
    print("Recommendation engine running in Python server")
    product_ids = request.json.get('product_ids')
    recommended_products = set()  # Use a set to store unique recommendations
    # Controls how much priority is given to products closer to the front of the array
    decay_factor = 0.8

    print("Product IDs:", product_ids)
    product_ids = [ObjectId(pid) for pid in product_ids]

    # Iterate through product IDs in the order they are provided
    for i, product_id in enumerate(product_ids):
        idx = products_df[products_df['_id'] == product_id].index
        print("idsss", idx)

        if len(idx) == 0:
            continue

        idx = idx[0]
        sim_scores = list(enumerate(cosine_sim_matrix[idx]))

        # Apply decay factor to prioritize products closer to the front
        sim_scores = sorted(
            sim_scores, key=lambda x: x[1] * (decay_factor ** i), reverse=True)
        # Get top 10 excluding the original product
        sim_scores = sim_scores[1:10]

        product_indices = [i[0] for i in sim_scores]
        print("indices", product_indices)

        recommended_products.update(
            products_df.iloc[product_indices]['_id'].astype(str).tolist())

        # Early stopping if enough recommendations are found
        if len(recommended_products) >= 10:
            break

    # Ensure only 10 products are returned
    recommended_products = list(recommended_products)[:10]
    print("Recommended Products:", recommended_products)
    return jsonify(recommended_products)


if __name__ == '__main__':
    app.run(debug=True, port=5001)
