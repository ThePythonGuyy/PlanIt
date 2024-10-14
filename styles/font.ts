import localFont from  'next/font/local';


export const longway = localFont({
    src: [
        {
            path:'./fonts/Longway.otf',
            style: 'normal',        
        },
    ],
    variable: '--font-longway',
})

export const revans = localFont({
    src: './fonts/Revans.ttf',
    variable: '--font-revans',
})

