import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import VtValidacion from '@/componentes/VtValidacion';

describe('VtValidacion.vue', () => {
    it('Valida contenido al montarse ', () => {
        const propsData = {
            uid: 'nombre',
            valor: 123,
            validaciones: ['sustantivo']
        };
        const wrapper = shallowMount(VtValidacion, {
            propsData
        });
        wrapper.vm.$nextTick(function(){
            expect(wrapper.findAll('label')).lengthOf(1);
        });
    });

    it('Valida contenido al cambiar el valor', () => {
        const propsData = {
            uid: 'nombre',
            valor: 'Francisco',
            validaciones: ['sustantivo']
        };
        const wrapper = shallowMount(VtValidacion, {
            propsData
        });
        wrapper.setProps({'valor': 123});
        expect(wrapper.findAll('label')).lengthOf(1);
    });
    
});