package main;

import (
	"net/http"
	"encoding/json"
)

func handleTargetEvent (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		var e Event;
		key := req.Header.Get("Key");
		db.Where(&Event{Key: key}).First(&e);
		if e.Key == key {
			ev := event{
				"",
				"",
				e.Business,
				e.Location,
				e.Date,
				e.Original_Date,
				e.Title,
				e.Description,
				e.Image,
				e.Owner,
				e.Key,
				e.Rating,
				e.getRSVPList(),
				e.getEventComments(),
			};
			r, _ := json.Marshal(ev);
			w.Write(r);
		}
	}
}