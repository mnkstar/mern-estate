/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(' ');

  const onChange = (e)=>{
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandlord();
  }, [listing.userRef]);

  return <>
  {landlord && (
    <div className="flex flex-col gap-3">
        <p>
            Contact <span className="font-semibold">{landlord.username}</span> at   
            <span className="text-red-700 font-bold hover:underline"> {landlord.email}</span> for <span className="font-semibold">
                {listing.name.toLowerCase()}
            </span>
        </p>
        <textarea name="message" id="message" rows="2" 
        placeholder="Your message" 
        value={message} 
        onChange={onChange}
        className="w-full border p-3 rounded-lg">
     </textarea>
     <Link className="bg-red-700 text-white font-semibold text-center p-3 rounded-lg uppercase hover:bg-green-700"
     to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
      Send your message
     </Link>

    </div>
  )}
  </>
}

export default Contact;
