import React, { useState } from "react";
import AuthService from "../../AuthService";
import avatar from "../../assets/images/me.png";
import { toast } from "react-toastify";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const GeneralInfo = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [name, setName] = useState(userPDF.name);
  const [image, setImage] = useState(userPDF.image);
  const [label, setLabel] = useState(userPDF.label);
  const [phone, setPhone] = useState(userPDF.phone);
  const [url, setUrl] = useState(userPDF.url);
  const [summary, setSummary] = useState(userPDF.summary);
  const [address, setAddress] = useState(userPDF.location.address);
  const [postalCode, setPostalCode] = useState(userPDF.location.postalCode);
  const [city, setCity] = useState(userPDF.location.city);
  const [countryCode, setCountryCode] = useState(userPDF.location.countryCode);
  const [region, setRegion] = useState(userPDF.location.region);

  let generalInfo = (e) => {
    e.preventDefault();
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name,
        image,
        label,
        phone,
        url,
        summary,
        location: {
          address,
          postalCode,
          city,
          countryCode,
          region,
        },
      }),
    })
      .then((response) => {
        toast.success("Save Changes");
        return response.json();
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("inUser", JSON.stringify(data));
          setUserPDF(data);
        }
        return data;
      });
  };

  const uploader = Uploader({ apiKey: "free" });

  const options = { multi: true };

  return (
    <form className="general-info" onSubmit={generalInfo}>
      <div className="user bg-box">
        <img
          src={
            image === undefined || image === null || image === ""
              ? avatar
              : image
          }
          alt={name}
        />

        <div className="content">
          <h2>Profile Photo</h2>
          <p>
            You can upload a .jpg, .png, or .gif photo with max size of 5MB.
          </p>
          <div className="btn-change-photo">
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) =>
                setImage(files.map((x) => x.fileUrl).join("\n"))
              }
            >
              {({ onClick }) => (
                <button className="btn-1 btn-2" onClick={onClick}>
                  Upload a Pic...
                </button>
              )}
            </UploadButton>
          </div>
        </div>
      </div>

      <div className="bg-box">
        <h3 className="title-box">Your Personal Info</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Full Name</span>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                name="name"
                defaultValue={name}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Wanted Job Title*</span>
              <input
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                name="label"
                placeholder="Wanted Job Title"
                defaultValue={label}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Phone</span>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                placeholder="Phone"
                defaultValue={phone}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">URL</span>
              <input
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                name="url"
                placeholder="URL"
                defaultValue={url}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Address</span>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="address"
                placeholder="Address"
                defaultValue={address}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Postal Code</span>
              <input
                onChange={(e) => setPostalCode(e.target.value)}
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                defaultValue={postalCode}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">City</span>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                name="city"
                placeholder="City"
                defaultValue={city}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote-item">
              <span className="lable">Country Code</span>
              <input
                onChange={(e) => setCountryCode(e.target.value)}
                type="text"
                name="countryCode"
                placeholder="Country Code"
                defaultValue={countryCode}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="quote-item">
              <span className="lable">Country</span>
              <input
                onChange={(e) => setRegion(e.target.value)}
                type="text"
                name="region"
                placeholder="Region"
                defaultValue={region}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="quote-item">
              <span className="lable">Professional Summary</span>
              <textarea
                onChange={(e) => setSummary(e.target.value)}
                name="summary"
                placeholder="Professional Summary"
                defaultValue={summary}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="box-btns">
        <button type="submit" className="btn-1" style={{ width: "100%" }}>
          Save Change
        </button>
      </div>
    </form>
  );
};

export default GeneralInfo;
