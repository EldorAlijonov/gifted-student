import React, { useEffect, useState } from "react";
import { GrantApi } from "../../services/grant";

function Grant() {
  const [grant, setGrant] = useState([]);

  const grantFunction = async () => {
    try {
      const response = await GrantApi.getGrant();
      setGrant(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grantFunction();
  }, []);

  return (
    <div className="row g-4">
      {grant.map((e) => {
        const formattedDate1 = new Date(e.start_date).toLocaleDateString(
          "en-GB"
        );
        const formattedDate2 = new Date(e.end_date).toLocaleDateString("en-GB");
        const formattedDate3 = new Date(e.create_at).toLocaleDateString(
          "en-GB"
        );
        return (
          <div className="col-lg-6" key={e.id}>
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{e.name}</h5>
                <p class="card-text mb-3">{e.description}</p>
                <p className="text-success">
                  <span className="text-dark">Boshlanish vaqti:</span>{" "}
                  {formattedDate1}
                </p>
                <p className="text-success">
                  <span className="text-dark">Tugash vaqti:</span>{" "}
                  {formattedDate2}
                </p>
                <div className="card-link d-flex">
                    <span>Grant nizomi :</span>
                  <a href={e.statute}> Tanishib chiqish</a>
                </div>
              </div>
              <div className="card-footer">
                <sapn className="text-secondary">{formattedDate3}</sapn>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Grant;
