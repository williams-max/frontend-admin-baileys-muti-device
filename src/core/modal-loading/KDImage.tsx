import * as React from 'react';


//import { makeStyles, createStyles } from '@mui/styles';
import { Modal, Fade, Skeleton, CircularProgress, makeStyles } from '@mui/material';

import { CSSProperties } from '@mui/styled-engine';
//import { CSSProperties } from '@material-ui/core/styles/withStyles';
/*

const useStyles: any = makeStyles(() =>
    createStyles({
        root: {
            position: 'relative',
        },
        skeleton: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto',
            userSelect: 'auto',
        },
        hiddenModal: {
            display: 'none',
            pointerEvents: 'none',
            userSelect: 'none',
        },
        largeImageContainer: {
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            padding: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);*/

const modalStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto',
    userSelect: 'auto',
}

const largeImageContainerStyles = {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}


export const KDImage = ({
   
  
    alt,
    width,
    height,
    time,
    showSkeleton,
    onclick,
    onload,
    preventDefaultOnClick,
    objectfit,
    objectposition,
    background,
}: {


    alt?: string;
    width?: string | number;
    height?: string | number;
    time?: number;
    showSkeleton?: boolean;
    onclick?<T extends unknown[], R = unknown>(...args: T): R | void;
    onload?<T extends unknown[], R = unknown>(...args: T): R | void;
    preventDefaultOnClick?: boolean;
    objectfit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
    objectposition?: string;
    background?: string;
}): React.ReactElement => {
    //
    // const classes = useStyles();
    const [imgLoaded, setImgLoaded] = React.useState(true);
    const [showImgSkeleton, setShowImageSkeleton] = React.useState(true);
    const [showBigImage, setShowBigImage] = React.useState(true);
    const [bigImgLoaded, setBigImgLoaded] = React.useState(true);


    const modalRef = React.useRef<HTMLDivElement>(null);

    /**
     *  Resolve to props or defaults
     */
    const props: {
        time: number;
        alt: string;
        showSkeleton: boolean;
        preventDefaultOnClick: boolean;
        width: CSSProperties['width'];
        height: CSSProperties['height'];
        objectfit: CSSProperties['objectFit'];
        objectposition: CSSProperties['objectPosition'];
        background: CSSProperties['background'];
    } = React.useMemo(() => {
        return {
            time: time ?? 800,
            alt: alt ?? '',
            showSkeleton: showSkeleton ?? true,
            preventDefaultOnClick: preventDefaultOnClick ?? false,
            width: width ?? 'auto',
            height: height ?? 'auto',
            objectfit: objectfit ?? 'cover',
            objectposition: objectposition ?? 'center',
            background: background ?? 'transparent',
        };
    }, [
        time,
        alt,
        showSkeleton,
        preventDefaultOnClick,
        width,
        height,
        objectfit,
        objectposition,
        background,
    ]);

 
 


    const LargeImage = React.useMemo(() => {

      


        return (
            <img

                //src="/taza_loading.png"
                src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-mobile-software-icon-png-image_6315991.png"
                style={{
                    width: '10%',
                    height: '10%',
                    // backgroundColor: 'white',
                    objectFit: 'contain',
                }}
                alt={alt || ''}
                onLoad={() => setBigImgLoaded(true)}
            />
        );
    }, [alt]);

    /**
     * Fade in small image
     */
   /* const ImageLoader = React.useMemo(() => {
        return (
            <Fade
                in={imgLoaded}
                timeout={time}
                onEnter={() => setShowImageSkeleton(false)}
            >
                {Image}
            </Fade>
        );
    }, [Image, imgLoaded, time]);*/

    /**
     *  Small image skeleton placeholders
     */
   /* const ImageSkeletons = React.useMemo(() => {
        return (
            props.showSkeleton && (
                <Fade
                    in={showImgSkeleton}
                    timeout={{ enter: 0, exit: time || props.time }}
                    mountOnEnter
                    unmountOnExit
                >
                    <Skeleton
                        variant='rect'
                        animation='wave'
                    //   className={classes.skeleton}
                    />
                </Fade>
            )
        );
    }, [props.showSkeleton, showImgSkeleton, time, props.time,
        //classes.skeleton
    ]);*/

    /**
     *  Popover modal for large image
     */
    const LargeImageModal = React.useMemo(() => {
        return (
            <Modal
                ref={modalRef}
                aria-labelledby='KDImage-large-image-modal'
                aria-describedby='Lazy load popover modal image view.'
                //className={classes.modal}
                sx={{ ...modalStyles }}
                open={showBigImage}

                keepMounted={bigImgLoaded}
            >
                <Fade
                    in={showBigImage}
                    //timeout={{ enter: props.time, exit: props.time / 4 }}
                >
                    <div //className={classes.largeImageContainer}
                        style={{ ...largeImageContainerStyles }}
                    >
                        <Fade in={bigImgLoaded}  //timeout={props.time}
                        >
                            {LargeImage}
                        </Fade>
                        <div style={{ position: 'absolute' }}>
                            <CircularProgress

                            />
                        </div>
                        {/* <Fade
                            in={!bigImgLoaded}
                            timeout={props.time}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div style={{ position: 'absolute' }}>
                                <CircularProgress
                                    style={{
                                        // color: 'white',
                                    }}
                                />
                            </div>
                        </Fade>*/}
                    </div>
                </Fade>
            </Modal>
        );
    }, [
        LargeImage,
        bigImgLoaded,
        showBigImage,
        // classes.modal,
        // classes.largeImageContainer,
        props.time,
    ]);

    return (
        <>
            {LargeImageModal}
        </>


    );
};


/*

  <div
      className={classes.root}
      style={{
        width: props.width,
        height: props.height,
        background: props.background,
      }}
    >
      {src && (
        <div style={{ height: '100%', width: '100%' }} onClick={onclickImage}>
          {ImageLoader}
          {ImageSkeletons}
          </div>
          )}
          {LargeImageModal}
        </div>
*/