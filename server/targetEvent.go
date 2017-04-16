package main;

import (
	"net/http"
	"strconv"
	"encoding/json"
)

func handleTargetEvent (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		var e Event;
		id := req.Header.Get("ID");
		i, _ := strconv.Atoi(id);
		db.Where(&Event{ID: i}).First(&e);
		if e.ID == i {
			ev := event{
				"",
				"",
				e.Location,
				e.Date,
				e.Time,
				e.Title,
				e.Description,
				e.Image,
				e.Owner,
				e.ID,
			};
			r, _ := json.Marshal(ev);
			w.Write(r);
		}
	}
}