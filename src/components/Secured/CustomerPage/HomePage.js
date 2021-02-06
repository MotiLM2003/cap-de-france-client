import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../../apis/api';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const HomePage = (props) => {
  const [headers, setHeaders] = useState(null);
  const [groups, setGroups] = useState(null);
  const [range, setRange] = useState({ min: 5, max: 52000 });
  const getHeaders = async () => {
    const { data } = await api.get('/headers/get-headers', {});
    console.log('data 2', data);
    setHeaders(data.headers);
  };

  const getGroups = async () => {
    try {
      const { data } = await api.get('/inventroy/get-groups', {});
      setGroups(data);
      console.log(data);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getHeaders();
    getGroups();
  }, []);

  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const renderInventory = () => {
    return (
      groups &&
      groups.map((group) => {
        return (
          <tr>
            {group.items.map((item) => {
              return <td>{item.text}</td>;
            })}
            <td>
              <button className='btn'>Acheter</button>
            </td>
          </tr>
        );
      })
    );
  };
  return (
    <div className='home-page-container'>
      <div className='cards-container'>
        <div className='cards-container__card tilt'>
          <div className='cards-container__content'>
            <h2>
              <i class='fas fa-wine-glass-alt'></i> CHAMPAGNE
            </h2>
            <section className='cards-container__toolbar'>
              <div className='cards-container__filters'>
                Price range:
                <div style={{ width: '20rem', fontSize: '2rem' }}>
                  <InputRange
                    maxValue={5200}
                    formatLabel={(value) => `${value}€`}
                    minValue={0}
                    value={range}
                    onChange={(value) => setRange(value)}
                  />
                </div>
              </div>
              <div className='cards-container__search-container'>
                <input
                  type='text'
                  className='cards-container__search'
                  placeholder='Search...'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              ></div>
            </section>
            <div class='cards-container__items'>
              <table className='cards-container__inventory-list'>
                <tr>
                  {renderHeaders()}
                  <th>Acheter</th>
                </tr>
                {renderInventory()}
              </table>
            </div>
          </div>
        </div>

        <div className='cards-container__card'>
          <div className='cards-container__content'>
            <h2>MON COMPTE</h2>

            <div className=''></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(HomePage);
