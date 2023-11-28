import Logo from '../Assets/logo.jpeg';

export default function ApplicationLogo(props) {
    return (
        <>
            <img src={Logo} alt="logo" className='h-16 w-16 mt-2' />
        </>
    );
}
