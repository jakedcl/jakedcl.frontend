export default function MarkerStyle(categoryId) {
  const styles = {
    highpeaks: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'yellow\' stroke=\'black\' stroke-width=\'1\'><path d=\'M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z\'/></svg>")',      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    primitivesites: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/primitivesites.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    trailheads: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/trailheads.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    lowpeaks: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/lowpeaks.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    parking: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/parking.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    leantos: {
      width: '15px',
      height: '14px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/leantos.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    stay: {
      width: '15px',
      height: '13px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/stay.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    viewpoints: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/viewpoints.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
     food: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/food.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    canoe: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/canoe.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    },
    waterfalls: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      backgroundImage: 'url("/markers/waterfalls.png")',
      backgroundSize: 'cover',
      cursor: 'pointer'
    }
  };

  return styles[categoryId];
}