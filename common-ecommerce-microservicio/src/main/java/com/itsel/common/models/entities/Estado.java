package com.itsel.common.models.entities;

public enum Estado {
	
	PENDIENTE,
	ENVIADO,
	ENTREGADO,
	CANCELADO;
	
	public static Estado fromId(Long id) {
		if (id == null) return null;
		
		switch (id.intValue()) {
		
			case 1: return PENDIENTE;
			case 2: return ENVIADO;
			case 3: return ENTREGADO;
			case 4: return CANCELADO;
			default:
				throw new IllegalArgumentException("Id de estado inválido: " + id);
			
		}
	}
}
