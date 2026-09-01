<?php
/**
 * GoHarv.® — Emite el token CSRF y la site key de Turnstile.
 *
 * El sitio es HTML estático, así que el token no se puede imprimir en el
 * markup: el JS lo pide acá antes de enviar el formulario.
 *
 * No es un agujero: una página de otro origen puede *disparar* este fetch,
 * pero la política de mismo origen del navegador le impide *leer* la
 * respuesta, así que nunca obtiene el token.
 */

declare(strict_types=1);

define('GOHARV', true);
require __DIR__ . '/includes/bootstrap.php';
require __DIR__ . '/includes/seguridad.php';

header('Cache-Control: no-store, no-cache, must-revalidate');

gh_json([
    'csrf_token'        => gh_csrf_token(),
    'turnstile_sitekey' => $config['turnstile']['site_key'] ?? '',
]);
