import { useState, useEffect } from 'react';
import ViewLocation from './ViewLocation';
import './ViewLocation.css';
import './AddLocation.css';

export default function AddLocation() {
  const [coordinates, setCoordinates] = useState('');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('Japan');
  const { lat, lng } = coordinates;

 function handleSubmit(e) {
    e.preventDefault();
    const location = {
      lat,
      lng,
      locationName,
      description,
      country,
      region,
    };
    AddLocation(location);
  }

  async function AddLocation(newLocation) {
  try {
    const res = await fetch('/api/Locations/add-location', {
      method: "Post",
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

  const cC = (location) => {
    setCoordinates(location);
 };

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
        <ViewLocation cC={(location) => setCoordinates(location)}/>
        <label>
          Description
          <input
            className="description"
            name="Description"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)} />
        </label>
          <button className="submit" type="submit"> Save Location </button>
      </form>
    </div>
  </>
  )
}
