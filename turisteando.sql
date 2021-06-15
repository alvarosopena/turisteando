-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2021 a las 02:13:50
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turisteando`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `type` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `type`) VALUES
(1, 'administrador'),
(2, 'viajero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updateAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `destacado` VARCHAR(45) COLLATE utf8_bin NOT NULL ;
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `image`, `description`, `createdAt`, `updateAt`, `deletedAt`) VALUES
(1, 'PATAGONIA EN VERANO', '50990.00', 'https://volemos.nyc3.digitaloceanspaces.com/blog/wp-content/uploads/2018/09/fitzroy-nevado.jpg', 'Recorré el sur con nosotros, te mostramos los mejores paisajes y actividades.', NULL, NULL, NULL),
(2, 'RECORRIENDO EL NORTE: JUJUY 360°', '40500.00', 'https://www.elancasti.com.ar/u/fotografias/m/2020/5/6/f800x450-192553_243999_5050.jpg', 'Conocé todos los pasiajes del norte y sus atracciones.', NULL, NULL, NULL),
(3, 'LA RUTA DEL VINO EN MENDOZA', '52990.00', 'https://assets.turismocity.com/cdn-cgi/image/format=auto,width=1400,fit=scale-down/valle%20de%20uco.png', 'Conocé las mejores bodegas de la región', NULL, NULL, NULL),
(4, '', '0.00', '', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `country` varchar(45) COLLATE utf8_bin NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `image` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `category_id` varchar(45) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `country`, `createdAt`, `updatedAt`, `deletedAt`, `image`, `category_id`) VALUES
(1, 'florencia', 'belmaña', 'florbel_03@hotmail.com', '$2a$10$0P0dl/dNqKWTo.0F3N8u5.h906LQyRE6La7pJt', 'arg', NULL, NULL, NULL, 'user-1620083695889.jpg', '1'),
(2, 'alvaro', 'sopeña', 'alvarosopenaf@gmail.com', '$2a$10$lEdY9WUNyAF5aGLicbe78eF8mtWzqbsfmExBij', 'arg', NULL, NULL, NULL, 'user-1620083787486.jpg', '1'),
(3, 'juan', 'perez', 'juanperez@gmail.com', '$2a$10$eq7Wj8IPqnYxrcyoAq7FjOiW9rqZVwBn7GmvUS', 'arg', NULL, NULL, NULL, 'user-1620083844430.jpg', '2'),
(4, 'doña', 'florinda', 'dona@florinda.com', '$2a$10$/bLlQJej/yqxql42tB9n5.FixF6w34L/FSTrZN', 'arg', NULL, NULL, NULL, NULL, '2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_email_UNIQUE` (`email`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
