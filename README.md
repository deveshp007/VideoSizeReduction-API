# Video Size Reduction API Documentation

The Video Size Reduction API allows users to upload videos, which will be resized and stored on Amazon S3. This documentation outlines the API endpoints, request/response structures, usage instructions, and deployment steps.

## API Endpoints

### Upload Video and Resize

Upload a video file and receive a resized version stored on Amazon S3.

- **URL:** `/api/upload`
- **Method:** POST
- **Request Body:** Form data with a `video` field containing the video file.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Video uploaded and resized.",
      "videoUrl": "URL_to_resized_video_on_S3"
    }
    ```
- **Error Responses:**
  - Status: 400 Bad Request
    ```json
    {
      "message": "No video file provided."
    }
    ```
  - Status: 500 Internal Server Error

## Usage Instructions

1. Ensure you have Node.js and npm installed.
2. Clone the repository and navigate to the project directory.
3. Create an `uploads` folder in the root directory of the project.
4. Install dependencies using `npm install`.
5. Set up the necessary environment variables (see the `.env` section below).
6. Run the API using `npm start`.
7. Use tools like Postman to send POST requests to `/api/upload` with video files.

## Amazon S3 Integration

1. Create an Amazon S3 bucket to store the uploaded and resized videos.
2. Configure your AWS credentials using environment variables or AWS configuration files.
3. Update the `.env` file with your S3 bucket name and region.

## Deployment on Amazon EC2

1. Launch an Amazon EC2 instance.
2. Set up Node.js and npm on the EC2 instance.
3. Clone your repository onto the EC2 instance.
4. Create an `uploads` folder in the root directory of the project on the EC2 instance.
5. Install dependencies using `npm install`.
6. Set up environment variables, including AWS credentials.
7. Start the API using `npm start` or a process manager like `pm2`.

## Environment Variables (.env)

Create a `.env` file in the project root and add the following variables:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
PORT=3000
```

## Deployed Server Link

The API is deployed and accessible at: [API_URL](https://your-api-url.com)
