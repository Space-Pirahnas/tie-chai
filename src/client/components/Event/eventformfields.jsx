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
      <TextField id="google_auto" placeholder="" hintText="Location" {...location.input}
        floatingLabelText="Location to host event" value={location.businessAddress}
        errorText={location.meta.error && "Location is required"}
      />
    </fieldset>
  ),

  keyWordField: keyword => (
    <fieldset className="form-group" id="keywordField">
      <TextField hintText="Business Name" {...keyword.input}
        floatingLabelText="Business Name" value={keyword.businessName}
        errorText={keyword.meta.error && "Name is required"}
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



