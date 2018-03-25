const ratio = {
    horizontalRatio: {
        analog: {
            minHeight: 1,
            width: 0.6
        },
        text: {
            width: 0.4,
            height: 1,
            paddingTop: 0.23
        },
        TimeFontSize: 0.09,
        DateFontSize: 0.075,
        city: 0.1
    },
    verticalRatio: {
        analog: {
            minHeight: 0.7,
            width: 1
        },
        text: {
            width: 1,
            height: 0.3
        },
        TimeFontSize: 0.07,
        DateFontSize: 0.06,
        city: 0.08
    }
}

export function getHorizontalLayoutStyle(width, height) {
    return {
        clock: {
            display: 'flex',
            flexDirection: 'row',
            minHeight: `${height}px`,
            width: `${width}px`,
            margin: '0 auto',
            left: '0'
        },
        analog: {
            minHeight: `${ratio.horizontalRatio.analog.minHeight * height}px`,
            width: `${ratio.horizontalRatio.analog.width * width}px`
        },
        text: {
            width: `${ratio.horizontalRatio.text.width * width}px`,
            height: `${ratio.horizontalRatio.text.height * height}px`,
            paddingTop: `${ratio.horizontalRatio.text.paddingTop * height}px`,
        },
        time: {
            fontSize: `${ratio.horizontalRatio.TimeFontSize * height}px`,
            margin: '0 auto',
        },
        date: {
            fontSize: `${ratio.horizontalRatio.DateFontSize * height}px`,
            margin: '0 auto',
        },
        city: {
            fontSize: `${ratio.horizontalRatio.city * height}px`,
            margin: '0 auto',
        }
    };
}

export function getVerticalLayoutStyle(width, height) {
    return {
        clock: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: `${height}px`,
            width: `${width}px`,
            margin: '0 auto',
            left: '0'
        },
        analog: {
            minHeight: `${ratio.verticalRatio.analog.minHeight * height}px`,
            width: `${ratio.verticalRatio.analog.width * width}px`
        },
        text: {
            width: `${ratio.verticalRatio.text.width * width}px`,
            height: `${ratio.verticalRatio.text.height * height}px`
        },
        time: {
            fontSize: `${ratio.verticalRatio.TimeFontSize * width}px`,
            margin: '0 auto',
        },
        date: {
            fontSize: `${ratio.verticalRatio.DateFontSize * width}px`,
            margin: '0 auto',
        },
        city: {
            fontSize: `${ratio.verticalRatio.city * width}px`,
            margin: '0 auto',
        }
    };
}

export function getBackGroundColor(time) {
  switch (true) {
    case (time >= 19 || time < 5):
      return "hour19";
    case (time >= 5 && time < 6):
      return "hour5";
    case (time >= 6 && time < 18):
      return "hour6";
    case (time >= 18 && time < 19):
      return "hour18";
    default:
      return null;
  }
}
