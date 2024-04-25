setInterval(() => {
  fetchPlayers().then((players) => {
    viewer.clearOverlays();
    players.forEach((player) => {
      const x_loc = (player.location_y - 157664.55791065) / 462.962962963;
      const y_loc = (player.location_x + 123467.1611767) / 462.962962963;

      drawDot(x_loc, y_loc, player);
    });
  });
}, 500);

fetchInfo().then((info) => {
  $('.textHelper').text(`${info.servername || 'Connect to server'}`);
});

function drawDot(x_loc, y_loc, player) {
  // 将座标转换为 OpenSeadragon 的画布座标
  const imageSize = viewer.source.dimensions;
  const viewportX = ((x_loc + 1000) / 2000) * imageSize.x;
  const viewportY = ((1000 - y_loc) / 2000) * imageSize.y;

  // 创建一个圆形 overlay

  // console.log(viewer);

  viewer.addOverlay(
    {
      px: viewportX,
      py: viewportY,
      className: 'test-overlay ' + player.userId,
    },
    // false,
    // "test-overlay"
  );

  // 设置 overlay 的样式

  // 返回 overlay 实例,以便于之后的移除

  $(`.${player.userId}`).append(`<div class="player-label">
            <span>Lv.${player.level}</span> <span>${
              player.name
            }</span> <span>(${x_loc?.toFixed(1)},${y_loc?.toFixed(1)})</span>
          </div>`);
}

function fetchPlayers() {
  const query = new URL(window.location).searchParams.toString();

  const ip = window.localStorage.getItem('ip');
  const port = window.localStorage.getItem('port');
  const password = window.localStorage.getItem('password');

  return fetch(
    `http://127.0.0.1:3434/players?${
      query || `ip=${ip}&port=${port}&password=${password}`
    }`,
  )
    .then((res) => res.json())
    .then((data) => {
      return data.players;
    });
}

function fetchInfo() {
  const query = new URL(window.location).searchParams.toString();

  const ip = window.localStorage.getItem('ip');
  const port = window.localStorage.getItem('port');
  const password = window.localStorage.getItem('password');

  return fetch(
    `http://127.0.0.1:3434/info?${
      query || `ip=${ip}&port=${port}&password=${password}`
    }`,
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

$(() => {
  $('.connect-to-server-btn').click(() => {
    let ip = prompt('Enter your IP Address');
    let port = prompt('Enter your REST API Port');
    let password = prompt('Enter your Admin Password');

    window.localStorage.setItem('ip', ip);
    window.localStorage.setItem('port', port);
    window.localStorage.setItem('password', password);
  });
});
