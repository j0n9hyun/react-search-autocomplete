import React, { useState, useEffect, useCallback } from 'react';
import '../static/scss/main.scss';
import axios from 'axios';
import * as THREE from 'three';

const Search = () => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  // const onChange = (e) => {
  //   setInput(e.target.value);
  //   suggestion.filter((v) => {
  //     return v.includes(input.toLowerCase());
  //   });
  // };

  const onChange = useCallback(
    (e) => {
      setInput(e.target.value);
      suggestion.filter((v) => {
        return v.includes(input.toLowerCase());
      });
    },
    [input, suggestion]
  );

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.outerWidth / 3, window.outerHeight / 3);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 'skyblue' });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  // const onKeyUp = (e) => {};

  // const inactivityTime = function () {
  //   let time;
  //   document.onkeyup = resetTimer;

  //   function muyaho() {
  //     console.log('무야호');
  //     fake();
  //   }

  //   function resetTimer() {
  //     clearTimeout(time);
  //     time = setTimeout(muyaho, 1000);
  //     // 1000 milliseconds = 1 second
  //   }
  // };
  const fake = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setSuggestion(res.data.map((v) => v.username));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // document.body.style.background = 'skyblue';
    function init() {
      let searchbar = document.querySelector('.searchbar');
      let autoComplete = document.querySelector('.autoComplete');
      searchbar.onkeyup = () => {
        if (input.trim().length !== 0) {
          autoComplete.classList.add('active');
        } else {
          autoComplete.classList.remove('active');
        }
      };
    }
    init();
    fake();
  });
  return (
    <div className='container'>
      <div className='header'>Search</div>
      <input className='searchbar' onChange={onChange} />
      <div className='autoComplete'>
        {suggestion
          .filter((v) => {
            return v.toLowerCase().includes(input.toLowerCase());
          })
          .map((v) => (
            <li>
              <b>{v}</b>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Search;
