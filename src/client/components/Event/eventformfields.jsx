import React from 'react';
import TextField from 'material-ui/TextField';


export const EventField = {
  titleField: eventtitle => (
    <fieldset className="form-group">
      <TextField hintText="Event Title"
        floatingLabelText="Event Title" {...eventtitle.input}
        errorText={eventtitle.meta.touched && eventtitle.meta.error && "Event Title is requried"}
      />
    </fieldset>
  ),

  locationField: location => (
    <fieldset className="form-group" id="locattionField">
      <TextField id="google_auto" hintText="Location" {...location.input}
        floatingLabelText="Location to host event"
        errorText={location.meta.touched && location.meta.error && "Location is requried"}
      />
    </fieldset>
  ),

  keyWordField: keyword => (
    <fieldset className="form-group" id="keywordField">
      <TextField hintText="Business Name" {...keyword.input}
        onChange={(e) => {
          keyword.onChangeAction(e.target.value);
          keyword.input.onChange(e);
        }}
        floatingLabelText="Business Name"
        errorText={keyword.meta.touched && keyword.meta.error && "keyword is requried"}
      />
    </fieldset>
  ),

  descriptionField: description => (
    <fieldset className="form-group">
      <TextField hintText="Description" {...description.input}
        floatingLabelText="Description to host event"
        errorText={description.meta.touched && description.meta.error && "description is requried"}
      />
    </fieldset>
  )

}



