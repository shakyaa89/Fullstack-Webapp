import "./index.css";

const MyInformation = ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string;
}) => {
  return (
    <div className="text-white">
      <h1>My Information</h1>
      <p>ID : {id}</p>
      <p>Name : {name}</p>
      {email ? <p>Email : {email}</p> : null}
      <br />
    </div>
  );
};

export default MyInformation;
