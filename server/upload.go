package main;

import(
	"fmt"
	"log"
	"bytes"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"github.com/satori/go.uuid"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
  "github.com/aws/aws-sdk-go/aws/credentials"
)
	
type file struct {
	preview string
}

func handleUpload (w http.ResponseWriter, req *http.Request ) {
	var u User;
	if req.Method == http.MethodPost {
		conn, e := client.Get();
		if e != nil {
			log.Println("error connecting to db");
		}
		defer client.Put(conn);
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
		db.Where(&User{Email: email}).First(&u);
		if u.Email == email {
			u.updateImage(url);
			res := u.getUser();
			r, _ := json.Marshal(res);
			conn.Cmd("HSET", u.Email , "Profile", string(r));
			successRequest(w, "successfully uploaded", "successfully uploaded");
		}
	}
}