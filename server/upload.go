package main;

import(
	"fmt"
	"bytes"
	"net/http"
	"io/ioutil"
	"github.com/satori/go.uuid"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
  "github.com/aws/aws-sdk-go/aws/credentials"
  // "github.com/aws/aws-sdk-go/aws/awsutil"
)
	
type file struct {
	preview string
}

func handleUpload (w http.ResponseWriter, req *http.Request ) {
	if req.Method == http.MethodPost {
		u1 := uuid.NewV4();
		email := req.Header.Get("Email");
		file, _ := ioutil.ReadAll(req.Body);
		token := ""; 
		creds := credentials.NewStaticCredentials(AWS.aws_access_key_id, AWS.aws_secret_access_key, token) 
		_, err := creds.Get(); 
		if err != nil { 
			fmt.Printf("bad credentials: %s", err) 
		} 
		fileBytes := bytes.NewReader(file);
		fileType := http.DetectContentType(file);
		cfg := aws.NewConfig().WithRegion(AWS.aws_region).WithCredentials(creds) 
		svc := s3.New(session.New(), cfg) 
		path := "/uploads/" + u1.String();
		params := &s3.PutObjectInput{ 
			Bucket: aws.String(AWS.aws_bucket_name), 
			Key: aws.String(path),
			Body: fileBytes,
			ContentType: aws.String(fileType),
		} 
		_, err = svc.PutObject(params) 
		if err != nil { 
			fmt.Printf("bad response: %s", err) 
		}
		url := AWS.aws_path + path;
		updateImage(email, url, w);
		// fmt.Printf("response %s", awsutil.StringValue(resp)) 
	}
}