import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes';
import { store } from './app/store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
