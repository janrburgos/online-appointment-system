import { useSelector } from "react-redux";

const ProfileTab = () => {
  const applicantInfo = useSelector(
    (state) => state.applicantInfoReducer.applicantInfo
  );
  return (
    <div className="ProfileTab">
      <div className="personal-info">
        <p>personal information</p>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{`${applicantInfo.firstName} ${applicantInfo.middleName} ${applicantInfo.lastName}`}</td>
            </tr>
            <tr>
              <th>gender</th>
              <td>{applicantInfo.gender}</td>
            </tr>
            <tr>
              <th>birth date</th>
              <td>{applicantInfo.birthDate}</td>
            </tr>
            <tr>
              <th>civil status</th>
              <td>{applicantInfo.civilStatus}</td>
            </tr>
            <tr>
              <th>citizenship</th>
              <td>{applicantInfo.citizenship}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="personal-address">
        <p>personal address</p>
        <table>
          <tbody>
            <tr>
              <th>place of birth</th>
              <td>{applicantInfo.placeOfBirth}</td>
            </tr>
            <tr>
              <th>current address</th>
              <td>{applicantInfo.currentAddress}</td>
            </tr>
            <tr>
              <th>permanent address</th>
              <td>{applicantInfo.permanentAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="contact-info">
        <p>contact information</p>
        <table>
          <tbody>
            <tr>
              <th>email address</th>
              <td>{applicantInfo.email}</td>
            </tr>
            <tr>
              <th>contact number</th>
              <td>{`0${applicantInfo.mobileNumber}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTab;
