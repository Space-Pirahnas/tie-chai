package main;

import (
	"github.com/SlyMarbo/gmail"
	"log"
	"fmt"
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

func sendEmailsToMatch(u User, f User) {
	fBody := constructMatchEmail(f, u);
	fSubject := constructMatchSubject(f.Name);
	sendEmail(u.Email, fSubject, fBody);
}