import { useState, useEffect } from 'react';
import ViewLocationChild from '.././ViewLocationChild';
import './ViewLocation.css';
import './SavedLocation.css';

export default function SavedLocation() {
  const [coordinates, setCoordinates] = useState('');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('Japan');
  const [locationID, setlocationID] = useState(0);
  let savedLocation = (JSON.parse(localStorage.getItem('location')))
  const { lat, lng } = coordinates;

  useEffect(() => {
    setCoordinates(savedLocation[0].Latitude, savedLocation[0].Longitude);
    setLocationName(savedLocation[0].Name);
    setDescription(savedLocation[0].Description);
    setRegion(savedLocation[0].Region);
    setCountry(savedLocation[0].Country);
    setlocationID(savedLocation[0].LocationID);
},[]);

  function handleSubmit(e) {
    e.preventDefault();
    const location = {
      lat,
      lng,
      locationName,
      description,
      country,
      region,
      locationID,
    };
    EditLocation(location);
  }

  async function EditLocation(newLocation) {
    console.log(newLocation);
    try {
      const res = await fetch('/api/Locations/edit-location', {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      })
      if (!res.ok) {
        throw new Error(`error ${res.status}`);
      }
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <div className="form-Container">
        <form onSubmit={handleSubmit}>
          <div className="name-region">
            <label>
              Location name
              <input
                name="locationName"
                type="text"
                value={locationName}
                onChange={e => setLocationName(e.target.value)} />
            </label>
            <label className="region">
              Region
              <select name="regions"
                defaultValue={region}
                onChange={e => setRegion(e.target.value)}>
                <option value="Tohoku">Tohoku </option>
                <option value="Kanto">Kanto </option>
                <option value="Chubu">Chubu </option>
                <option value="Kansai">Kansai </option>
                <option value="ChuGoku">ChuGoku </option>
              </select>
            </label>
            <label className="Country">
              Country
              <select name="Country"
                onChange={e => setCountry(e.target.value)}>
                <option value="Japan">Japan </option>
              </select>
            </label>
          </div>
          <ViewLocationChild cC={(location) => setCoordinates(coordinates)} />
          <label>
            Description
            <textarea
              rows="9"
              columns="8"
              className="description"
              name="Description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)} />
          </label>
          <button className="form-submit" type="submit"> Edit Location </button>
        </form>
      </div>
    </>
  )
}
