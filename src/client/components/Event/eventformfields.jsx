import React from 'react';

export const EventField = {
  titleField: eventtitle => (
    <fieldset className="form-group">
      <label>Title: </label>
      <input className="form-control" {...eventtitle.input} placeholder="Event Title" />
      {eventtitle.meta.touched && eventtitle.meta.error && <div className="error">{eventtitle.meta.error}</div>}
    </fieldset>
  ),

  locationField: location => (
    <fieldset className="form-group" id="locattionField">
      <label>Location: </label>
      <input id="google_auto" 
      className="form-control" {...location.input} 
      onChange={(e) => {
        location.onChangeAction(location.input.value);
        location.input.onChange(e);
      }}
      placeholder="Enter meet address ..." />
      {location.meta.touched && location.meta.error && <div className="error">{location.meta.error}</div>}
    </fieldset>
  ),

  meetTimeField: meet_time => (
    <fieldset className="form-group">
      <label>Time: </label>
      <input className="form-control" {...meet_time.input} />
      {meet_time.meta.touched && meet_time.meta.error && <div className="error">{meet_time.meta.error}</div>}
    </fieldset>
  ),

  descriptionField: description => (
    <fieldset className="form-group">
      <label>Description: </label>
      <input className="form-control" {...description.input} />
      {description.meta.touched && description.meta.error && <div className="error">{description.meta.error}</div>}
    </fieldset>
  )

}