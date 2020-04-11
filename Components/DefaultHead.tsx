import Head from 'next/head';

import { Menu } from '../Components/Menu';

type DefaultHeadProps = {}

const DefaultHead: React.FC<DefaultHeadProps> = () => {
    return (
		<Head>
			<title>DevFit - do u even lift?</title>
		</Head>
	)
};
  
export default DefaultHead;