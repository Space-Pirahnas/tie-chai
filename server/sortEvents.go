package main;

import (
	"sort"
	"time"
)

type By func(e1, e2 *event) bool;

type eventSorter struct {
	events []event
	by      func(e1, e2 *event) bool
}

func (e *eventSorter) Len() int {
	return len(e.events);
}

func (e *eventSorter) Swap(i, j int) {
	e.events[i], e.events[j] = e.events[j], e.events[i];
}

func (by By) Sort(events []event) {
	es := &eventSorter{
		events: events,
		by:      by,
	}
	sort.Sort(es)
}

func (e *eventSorter) Less(i, j int) bool {
	return e.by(&e.events[i], &e.events[j]);
}

func sortEvents(events []event) []event {
	timeSort := func(e1, e2 *event) bool {
		const longForm = "Jan 2, 2006 at 3:04pm (MST)";
		then := time.Date(2200, 11, 17, 20, 34, 58, 651387237, time.UTC)
		t1, _ := time.Parse(longForm, e1.Date);
		t2, _ := time.Parse(longForm, e2.Date);
		return t1.Sub(then) < t2.Sub(then);
	}

	By(timeSort).Sort(events);
	return events;
}