const ratio = {
    fontSize: 0.02,
    posts: 0.9,
    postHeader: 0.15,
    postBody: 0.85,
    postNoPicture: {
        postDesc: 1,
    },
    postWithPicture: {
        postDesc: 0.25,
        marginTop: 0.03,
        postMedia: 0.7
    }
}

function getFontSize(content, divHeight, divWidth) {
    let ret = Math.sqrt((divHeight * divWidth) / content.length);
    return (ret > 53) ? 53 : ret;
}

export function getFacebookPostStyle(description, isPostWithPicture, postHeight, postWidth) {
    let style = {
        postHeader: {
            maxHeight: `${ratio.postHeader * 100}%`
        },
        postBody: {
            height: `${ratio.postBody * 100}%`
        },
        postDesc: {},
        postMedia: {}
    };
    (isPostWithPicture)
        ? style = {
            ...style,
            postDesc: {
                fontSize: `${getFontSize(description, postHeight * ratio.postBody * ratio.postWithPicture.postDesc, postWidth)}px`,
                overflow: 'hidden',
                height: `${ratio.postWithPicture.postDesc * 100}%`

            },
            postMedia: {
                height: `${ratio.postWithPicture.postMedia * 100}%`,
                marginTop: `${ratio.postWithPicture.marginTop * 100}%`
            }
        }
        : style = {
            ...style,
            postDesc: {
                fontSize: `${getFontSize(description, postHeight * ratio.postBody * ratio.postNoPicture.postDesc, postWidth)}px`,
                overflow: 'hidden',
                height: `${ratio.postNoPicture.postDesc * 100}%`

            },
            postMedia: {
                display: 'none'
            }
        }
    return style;
};