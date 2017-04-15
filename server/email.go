package main;

import (
	"log"
	"fmt"
	"github.com/SlyMarbo/gmail"
	"github.com/satori/go.uuid"
)

func sendEmail(recipient string, subject string, body string) {
	email := gmail.Compose(subject, body);
	email.From = Gmail.Email;
	email.Password = Gmail.Password;
	email.ContentType = "text/html; charset=utf-8";
	email.AddRecipient(recipient);
	err := email.Send();
	if err != nil {
		log.Println("failed to send message", err);
	}
}

func constructMatchEmail(match User, user User) string {
	return fmt.Sprintf(
		`<div>
			<h3>%s has matched with you and wants to connect!</h3>
			<p>Hello %s,</p>
				<p2>I am pleased to inform you that you have found a match!</p2>
				<p3>Rember to reach out as soon as possible to start building that connection!</p3>
			<p> From Tie-Chai, we thank you for your continuous support!</p>
			<p>Visit your <a href="http://www.tie-chai.com">portal</a> to begin networking today!</p>
		</div>
		<p>Sincerely,</p>
		<p>Your Tie-Chai Team</p>
		`, match.Name, user.Name);
}

func constructMatchSubject(name string) string {
	return fmt.Sprintf("%s has matched with you on Tie-Chai", name);
}

func (u User) sendEmailsToMatch(f User) {
	fBody := constructMatchEmail(f, u);
	fSubject := constructMatchSubject(f.Name);
	sendEmail(u.Email, fSubject, fBody);
}

func constructVerifyEmail(u usr, url string, id string) string {
	return fmt.Sprintf(
		`<div>
			<h3>Welcome to Tie-Chai!</h3>
			<p>Hello %s,</p>
				<p>Thank you for signing up for Tie-Chai. Before you can begin, there is just one last step:</p>
				<p>Please verify your email by clicking this <a href="%s/api/verify?Id=%s&Email=%s">link</a>.</p>
				<p>Once verified, you can begin searching for connections and begin expanding your network!</p>
		</div>
		<p>Sincerely,</p>
		<p>Your Tie-Chai Team</p>
		`, u.Name, url, id, u.Email);
}

func constructVerifySubject(name string) string {
	return fmt.Sprintf("Welcome to Tie-Chai %s!", name);
}

func (u usr) sendVerificationEmail() {
	u1 := uuid.NewV1();
	vBody := constructVerifyEmail(u, hostURL, u1.String());
	vSubject := constructVerifySubject(u.Name);
	sendEmail(u.Email, vSubject, vBody);
}