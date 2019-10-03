(() => {
  const status = 'offline';
  const maxDays = 1;
  const maxHours = 10;
  const maxMinutes = Infinity;



  const StatusTypes = Object.freeze({
    ALL: 'all',
    OFFLINE: 'offline',
    ONLINE: 'online',
    PLAYING: 'playing',
  });

  const TimeTypes = Object.freeze({
    DAYS: 'days',
    HOURS: 'hrs',
    MINUTES: 'mins',
  });
  
  function parseDate(string) {
    const result = {days: 0, hours: 0, minutes: 0};
  
    const times = string.split('ago').shift().trim().split(', ');
    for (let time of times) {
      const [amount, type] = time.split(' ');
      switch (type) {
        case TimeTypes.DAYS: {
          result.days = parseInt(amount);
        }; break;
        case TimeTypes.HOURS: {
          result.hours = parseInt(amount);
        }; break;
        case TimeTypes.MINUTES: {
          result.minutes = parseInt(amount);
        }; break;
      }
    }
    return result;
  }

  const MaxTimes = {days: maxDays, hours: maxHours, minutes: maxMinutes};
  (() => {
    let divs;
    switch (status) {
      case StatusTypes.ALL: {
        divs = document.getElementsByClassName('friend_block_v2');
      }; break;
      case StatusTypes.ONLINE: {
        divs = document.getElementsByClassName('player_avatar online');
      }; break;
      case StatusTypes.PLAYING: {
        divs = document.getElementsByClassName('player_avatar in-game');
      }; break;
      default: {
        divs = document.getElementsByClassName('friend_last_online_text');
      };
    }

    const checkboxes = [];
    for (let div of divs) {
      switch (status) {
        case StatusTypes.ALL: {
          const checkbox = div.getElementsByClassName('selectable_overlay')[0];
          checkboxes.push(checkbox);
        }; break;
        case StatusTypes.ONLINE:
        case StatusTypes.PLAYING: {
          const checkbox = div.closest('.friend_block_v2').getElementsByClassName('selectable_overlay')[0];
          checkboxes.push(checkbox);
        }; break;
        default: {
          const checkbox = div.closest('.friend_block_v2').getElementsByClassName('selectable_overlay')[0];
          const text = div.innerText.split('Last Online').pop().trim();
          if (!text) {
            // user has been offline since forever
            checkboxes.push(checkbox);
            continue;
          }
          const time = parseDate(text);
          for (let key in MaxTimes) {
            if (MaxTimes[key] <= time[key]) {
              checkboxes.push(checkbox);
              break;
            }
          }
        };
      }
    }

    switch (status) {
      case StatusTypes.ALL: {
        console.log(`Selected ${checkboxes.length} friends`);
      }; break;
      case StatusTypes.ONLINE:
      case StatusTypes.PLAYING: {
        console.log(`Select ${checkboxes.length} friends that are ${status}`);
      }; break;
      default: {
        console.log(
          `Selected ${checkboxes.length} friends for being offline for more than ${MaxTimes.days} days, ${MaxTimes.hours} hours, ${MaxTimes.minutes} minutes.`,
        );
      };
    }
    for (let checkbox of checkboxes) {
      checkbox.click();
    }
  })();
})();
