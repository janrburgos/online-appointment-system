const Profile = () => {
  return (
    <div className="Profile">
      <div className="personal-info">
        <p>personal information</p>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>juan dela cruz</td>
            </tr>
            <tr>
              <th>gender</th>
              <td>male</td>
            </tr>
            <tr>
              <th>birth date</th>
              <td>01/01/1993</td>
            </tr>
            <tr>
              <th>civil status</th>
              <td>single</td>
            </tr>
            <tr>
              <th>citizenship</th>
              <td>filipino</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="personal-address">
        <p>personal address</p>
        <table>
          <tr>
            <th>place of birth</th>
            <td>manila</td>
          </tr>
          <tr>
            <th>current address</th>
            <td>manila</td>
          </tr>
          <tr>
            <th>permanent address</th>
            <td>manila</td>
          </tr>
        </table>
      </div>
      <div className="contact-info">
        <p>contact information</p>
        <table>
          <tr>
            <th>email address</th>
            <td>email@email.com</td>
          </tr>
          <tr>
            <th>contact number</th>
            <td>091234567890</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Profile;
