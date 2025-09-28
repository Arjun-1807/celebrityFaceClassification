# Sports Person Detection

A web application that detects and identifies sports celebrities in images using machine learning and computer vision.

## Table of Contents

- [Overview](#overview)
- [Supported Celebrities](#supported-celebrities)
- [How the Model Was Trained](#how-the-model-was-trained)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [UI Features](#ui-features)
- [Credits](#credits)

---

## Overview

This project uses a trained machine learning model to classify images of sports celebrities. The backend is built with Flask, and the frontend is a modern HTML/CSS/JS interface that allows users to upload images via drag-and-drop or file selection.

---

## Supported Celebrities

- Roger Federer
- Virat Kohli
- Serena Williams
- Maria Sharapova
- Lionel Messi

---

## How the Model Was Trained

1. **Data Collection**

   - Gathered images of each celebrity from various sources.
   - Images were stored in separate folders for each celebrity.

2. **Preprocessing**

   - Used OpenCV Haarcascade classifiers to detect faces and eyes in each image.
   - Cropped images to focus on faces with at least two detected eyes.
   - Applied wavelet transforms (`db1`, level 5) for feature extraction, combining raw pixel data and wavelet features.

3. **Feature Engineering**

   - Resized all cropped face images to 32x32 pixels.
   - Created feature vectors by flattening both the raw and wavelet-transformed images.

4. **Model Training**

   - Used a scikit-learn classifier (e.g., SVM, RandomForest, or similar).
   - Split data into training and test sets.
   - Trained the model to classify images into one of the five celebrity classes.

5. **Saving Artifacts**
   - Saved the trained model as `saved_model.pkl`.
   - Created a `class_dictionary.json` mapping class names to numbers.

---

## Project Structure

```
sportsPersonDetection/
│
├── server/
│   ├── server.py              # Flask API
│   ├── util.py                # Image processing and classification logic
│   ├── wavelet.py             # Wavelet transform functions
│   ├── artifacts/
│   │   ├── class_dictionary.json
│   │   └── saved_model.pkl
│   ├── opencv/
│   │   └── haarcascades/
│   │       └── [Haarcascade XML files]
│   └── test_images/
│       └── [Sample images]
│
├── UI/
│   ├── app.html
│   ├── app.css
│   ├── app.js
│   └── images/
│       └── [UI images]
│
├── venv/                      # Python virtual environment (not tracked by git)
├── requirements.txt           # Python dependencies
└── .gitignore                 # Git ignore file
```

---

## Setup & Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/sportsPersonDetection.git
   cd sportsPersonDetection
   ```

2. **Create and activate a virtual environment**

   ```sh
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**

   ```sh
   pip install -r requirements.txt
   ```

4. **Run the Flask server**

   ```sh
   cd server
   python server.py
   ```

5. **Open the UI**
   - Open `UI/app.html` in your browser.

---

## Usage

- Drag and drop or select an image of a supported celebrity in the UI.
- Click "Detect" to classify the image.
- The predicted celebrity and confidence score will be displayed.

---

## API Endpoint

- **POST** `/classify_image`
  - **Form Data:** `image_data` (base64-encoded image)
  - **Response:** JSON with predicted class, confidence, and class dictionary.

---

## UI Features

- Modern card layout with gradient background
- Drag-and-drop and click-to-upload support
- Instant image preview
- Clear note about supported celebrities
- Responsive and clean design

---

## Credits

- Developed by Arjun
- Powered by Flask, scikit-learn, OpenCV, and wavelet transforms
